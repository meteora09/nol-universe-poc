// Unified SDK entry point. VITE_AMPLITUDE_ENABLED=false guarantees no SDK initialization,
// autocapture, Session Replay, Experiment fetch, or Guides & Surveys requests.
export const amplitudeConfig = {
  apiKey: import.meta.env.VITE_AMPLITUDE_API_KEY || '',
  enabled: import.meta.env.VITE_AMPLITUDE_ENABLED === 'true',
  serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE || 'US',
};
let initialization;
let amplitude;
export function initializeAmplitude(initialUserId, initialDeviceId) {
  if (!amplitudeConfig.enabled || !amplitudeConfig.apiKey) return Promise.resolve(false);
  if (!initialization) {
    initialization = import('@amplitude/unified').then(async sdk => {
      amplitude = sdk;
      await amplitude.initAll(amplitudeConfig.apiKey, {
        serverZone: amplitudeConfig.serverZone,
        analytics: { autocapture: true, ...(initialUserId ? { userId: initialUserId } : {}), ...(initialDeviceId ? { deviceId: initialDeviceId } : {}) },
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
// Custom track calls intentionally wait for the Braze-derived taxonomy.
