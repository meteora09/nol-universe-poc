// One browser Analytics instance powers events, Replay, Feature Experiment and G&S.
import {normalizeRoomFlagValue} from './hotelRoomExperiment';
import {makeExperimentUser} from './experimentIdentity';
export const amplitudeConfig = {
  apiKey: import.meta.env.VITE_AMPLITUDE_API_KEY || '',
  enabled: import.meta.env.VITE_AMPLITUDE_ENABLED === 'true',
  serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE || 'US',
  experimentDeploymentKey: import.meta.env.VITE_AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY || import.meta.env.VITE_AMPLITUDE_API_KEY || '',
  featureFlagKey: import.meta.env.VITE_AMPLITUDE_FEATURE_FLAG_KEY || 'nol-poc-booking-cta',
  hotelRoomFlagKey: import.meta.env.VITE_HOTEL_ROOM_FLAG_KEY || 'top10_hotel_room_summary_card',
  hotelRoomExperimentEnabled: import.meta.env.VITE_HOTEL_ROOM_EXPERIMENT_ENABLED === 'true',
};
let initialization;
let amplitude;
let identityOperations = Promise.resolve();
let lastFetchIdentityKey = null;
const recentFetches = [];
export const getExperimentFetchDiagnostics = () => [...recentFetches];
const recordFetch = entry => {
  if (!recentFetches.includes(entry)) recentFetches.unshift(entry);
  recentFetches.length = Math.min(recentFetches.length, 8);
  window.dispatchEvent(new Event('nol-poc-experiment-fetch'));
};
const enqueueIdentityOperation = operation => {
  const next = identityOperations.catch(() => {}).then(operation);
  identityOperations = next.catch(() => {});
  return next;
};
const applyAnalyticsIdentity = user => {
  if (user?.amplitudeDeviceId) amplitude.setDeviceId(user.amplitudeDeviceId);
  amplitude.setUserId(user?.amplitudeUserId || (user?.amplitudeDeviceId ? undefined : user?.id));
};
const recentTags = [];
export function getTaggingPreview() {
  return [...recentTags];
}
export function initializeAmplitude(initialUserId, initialDeviceId) {
  if (!amplitudeConfig.enabled || !amplitudeConfig.apiKey) return Promise.resolve(false);
  if (!initialization) {
    initialization = import('@amplitude/unified').then(async sdk => {
      amplitude = sdk;
      await amplitude.initAll(amplitudeConfig.apiKey, {
        serverZone: amplitudeConfig.serverZone,
        analytics: {
          autocapture: {
            attribution: true, pageViews: true, sessions: true,
            formInteractions: true, fileDownloads: true, pageUrlEnrichment: true,
            elementInteractions: true, frustrationInteractions: true,
            networkTracking: true, webVitals: true, performanceTracking: true,
          },
          ...(initialUserId ? { userId: initialUserId } : {}),
          ...(initialDeviceId ? { deviceId: initialDeviceId } : {}),
        },
        sessionReplay: { sampleRate: 1 },
        experiment: amplitudeConfig.experimentDeploymentKey
          ? { deploymentKey: amplitudeConfig.experimentDeploymentKey, automaticExposureTracking: false, throwOnError: true }
          : { automaticExposureTracking: false, throwOnError: true },
        engagement: { skip: false },
      });
      return true;
    }).catch(error => { initialization = undefined; console.warn('Amplitude SDK 초기화에 실패했습니다.', error); return false; });
  }
  return initialization;
}
export async function identifySignedInUser(user) {
  if (!amplitudeConfig.enabled) return;
  return enqueueIdentityOperation(async () => {
    if (!await initializeAmplitude()) return;
    applyAnalyticsIdentity(user);
    // A pasted Amplitude ID represents an existing real profile.
    if (user.amplitudeUserId || user.amplitudeDeviceId) return;
    const identify = new amplitude.Identify()
      .set('tier', user.tier)
      .set('signup_date', user.signupDate)
      .set('lifetime_spend', user.lifetimeSpend)
      .set('persona', user.persona || 'custom');
    amplitude.identify(identify);
  });
}
export function clearAmplitudeUser() {
  if (!amplitudeConfig.enabled) return Promise.resolve();
  return enqueueIdentityOperation(async () => {
    if (!await initializeAmplitude()) return;
    amplitude.reset();
    amplitude.experiment()?.clear();
    lastFetchIdentityKey = null;
  });
}
export function getAmplitudeDeviceId() {
  return amplitude?.getDeviceId() || null;
}
async function fetchExperimentVariants(user, reason) {
  if (!amplitudeConfig.enabled || !amplitudeConfig.experimentDeploymentKey) return null;
  const entry = {at: new Date().toISOString(), reason, identity: user?.amplitudeDeviceId&&!user?.amplitudeUserId?'Device ID':user?'User ID':'익명', status:'대기 중'};
  recordFetch(entry);
  try {
    const variants = await enqueueIdentityOperation(async () => {
      if (!await initializeAmplitude()) throw new Error('SDK 초기화 실패');
      applyAnalyticsIdentity(user);
      const experiment = amplitude.experiment();
      if (!experiment) throw new Error('Experiment SDK 없음');
      const context = makeExperimentUser(user, amplitude.getDeviceId());
      const key = JSON.stringify(context);
      if (key !== lastFetchIdentityKey) {
        // A failed fetch must not show a variant cached for a previous user.
        experiment.clear();
        lastFetchIdentityKey = key;
      }
      entry.status = '요청 중'; recordFetch(entry);
      await experiment.fetch(context);
      return {
        booking: experiment.variant(amplitudeConfig.featureFlagKey)?.value,
        hotelRoom: experiment.variant(amplitudeConfig.hotelRoomFlagKey)?.value,
      };
    });
    entry.status = '성공'; recordFetch(entry);
    return variants;
  } catch (error) {
    entry.status = '실패'; recordFetch(entry);
    console.warn('Amplitude Feature Experiment 평가에 실패했습니다.', error);
    return null;
  }
}
export async function getBookingExperimentVariant(user) {
  const variants = await fetchExperimentVariants(user, '세션/아이덴티티');
  const value = variants?.booking;
  return value === 'control' || value === 'treatment' ? value : null;
}
export function exposeBookingExperiment() {
  if (amplitudeConfig.enabled && amplitudeConfig.featureFlagKey) {
    amplitude?.experiment()?.exposure(amplitudeConfig.featureFlagKey);
  }
}
export async function getHotelRoomExperimentVariant(user) {
  if (!amplitudeConfig.hotelRoomExperimentEnabled) return null;
  const variants = await fetchExperimentVariants(user, '객실 상세');
  return normalizeRoomFlagValue(variants?.hotelRoom);
}
export function exposeHotelRoomExperiment() {
  if (amplitudeConfig.hotelRoomExperimentEnabled && amplitudeConfig.enabled) {
    amplitude?.experiment()?.exposure(amplitudeConfig.hotelRoomFlagKey);
  }
}
export async function trackBehavior(tag, user) {
  if (!tag) return false;
  const properties = {platform: 'web', ...tag.properties};
  const entry = {at: new Date().toISOString(), eventType: tag.eventType, properties, status: '전송 중'};
  recentTags.unshift(entry);
  recentTags.length = Math.min(recentTags.length, 20);
  const refresh = () => window.dispatchEvent(new Event('nol-poc-tagged'));
  refresh();
  if (!amplitudeConfig.enabled || !amplitudeConfig.apiKey) {entry.status = '미전송'; refresh(); return false;}
  try {
    if (!await initializeAmplitude()) {entry.status = 'SDK 초기화 실패'; refresh(); return false;}
    if (user) {
      if (user.amplitudeDeviceId) amplitude.setDeviceId(user.amplitudeDeviceId);
      amplitude.setUserId(user.amplitudeUserId || (user.amplitudeDeviceId ? undefined : user.id));
    }
    const result = await amplitude.track(tag.eventType, properties).promise;
    entry.status = result.code === 200 ? '전송 성공' : `전송 실패 (${result.code})`;
    refresh();
    return result.code === 200;
  } catch (error) {
    entry.status = '전송 실패';
    refresh();
    console.warn('Amplitude 행동 태깅에 실패했습니다.', error);
    return false;
  }
}
