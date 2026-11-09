// Unified SDK entry point. VITE_AMPLITUDE_ENABLED=false guarantees no SDK initialization,
// autocapture, Session Replay, Experiment fetch, or Guides & Surveys requests.
export const amplitudeConfig = {
  apiKey: import.meta.env.VITE_AMPLITUDE_API_KEY || '',
  enabled: import.meta.env.VITE_AMPLITUDE_ENABLED === 'true',
  serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE || 'US',
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
        analytics: { autocapture: { elementInteractions: false, formInteractions: false }, ...(initialUserId ? { userId: initialUserId } : {}), ...(initialDeviceId ? { deviceId: initialDeviceId } : {}) },
        sessionReplay: { sampleRate: 1 },
        engagement: { skip: false },
      });
      return true;
    });
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
export async function trackBehavior(tag, user) {
  if (!tag) return false;
  const properties = {platform: 'web', ...tag.properties};
  recentTags.unshift({at: new Date().toISOString(), eventType: tag.eventType, properties});
  recentTags.length = Math.min(recentTags.length, 20);
  window.dispatchEvent(new Event('nol-poc-tagged'));
  if (!amplitudeConfig.enabled || !amplitudeConfig.apiKey) return false;
  try {
    if (!await initializeAmplitude()) return false;
    if (user) {
      if (user.amplitudeDeviceId) amplitude.setDeviceId(user.amplitudeDeviceId);
      amplitude.setUserId(user.amplitudeUserId || (user.amplitudeDeviceId ? undefined : user.id));
    }
    amplitude.track(tag.eventType, properties);
    return true;
  } catch (error) {
    console.warn('Amplitude 행동 태깅에 실패했습니다.', error);
    return false;
  }
}
