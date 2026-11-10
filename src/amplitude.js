// One browser Analytics instance powers events, Replay, Feature Experiment and G&S.
export const amplitudeConfig = {
  apiKey: import.meta.env.VITE_AMPLITUDE_API_KEY || '',
  enabled: import.meta.env.VITE_AMPLITUDE_ENABLED === 'true',
  serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE || 'US',
  experimentDeploymentKey: import.meta.env.VITE_AMPLITUDE_EXPERIMENT_DEPLOYMENT_KEY || import.meta.env.VITE_AMPLITUDE_API_KEY || '',
  featureFlagKey: import.meta.env.VITE_AMPLITUDE_FEATURE_FLAG_KEY || 'nol-poc-booking-cta',
};
let initialization;
let amplitude;
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
          ? { deploymentKey: amplitudeConfig.experimentDeploymentKey, automaticExposureTracking: false }
          : { automaticExposureTracking: false },
        engagement: { skip: false },
      });
      return true;
    }).catch(error => { initialization = undefined; console.warn('Amplitude SDK 초기화에 실패했습니다.', error); return false; });
  }
  return initialization;
}
export async function identifySignedInUser(user) {
  if (!amplitudeConfig.enabled) return;
  if (!await initializeAmplitude()) return;
  if (user.amplitudeDeviceId) amplitude.setDeviceId(user.amplitudeDeviceId);
  amplitude.setUserId(user.amplitudeUserId || (user.amplitudeDeviceId ? undefined : user.id));
  // A pasted Amplitude User ID represents an existing real profile. Do not
  // overwrite its properties with the local demo persona's fake attributes.
  if (user.amplitudeUserId || user.amplitudeDeviceId) return;
  const identify = new amplitude.Identify()
    .set('tier', user.tier)
    .set('signup_date', user.signupDate)
    .set('lifetime_spend', user.lifetimeSpend)
    .set('persona', user.persona || 'custom');
  amplitude.identify(identify);
}
export function clearAmplitudeUser() {
  if (amplitudeConfig.enabled && amplitude) amplitude.reset();
}
export function getAmplitudeDeviceId() {
  return amplitude?.getDeviceId() || null;
}
export async function getBookingExperimentVariant(user) {
  if (!amplitudeConfig.enabled || !amplitudeConfig.experimentDeploymentKey || !amplitudeConfig.featureFlagKey) return null;
  if (!await initializeAmplitude()) return null;
  const experiment = amplitude.experiment();
  if (!experiment) return null;
  try {
    await experiment.fetch(user ? {
      user_id: user.amplitudeUserId || (user.amplitudeDeviceId ? undefined : user.id),
      device_id: user.amplitudeDeviceId || amplitude.getDeviceId(),
    } : { device_id: amplitude.getDeviceId() });
    const value = experiment.variant(amplitudeConfig.featureFlagKey)?.value;
    return value === 'control' || value === 'treatment' ? value : null;
  } catch (error) {
    console.warn('Amplitude Feature Experiment 평가에 실패했습니다.', error);
    return null;
  }
}
export function exposeBookingExperiment() {
  if (amplitudeConfig.enabled && amplitudeConfig.featureFlagKey) {
    amplitude?.experiment()?.exposure(amplitudeConfig.featureFlagKey);
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
