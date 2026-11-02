// Unified SDK entry point. VITE_AMPLITUDE_ENABLED=false guarantees no SDK initialization,
// autocapture, Session Replay, Experiment fetch, or Guides & Surveys requests.
import * as amplitude from '@amplitude/unified';

export const amplitudeConfig = {
  apiKey: import.meta.env.VITE_AMPLITUDE_API_KEY || '',
  enabled: import.meta.env.VITE_AMPLITUDE_ENABLED === 'true',
  serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE || 'US',
};
let initialization;
export function initializeAmplitude() {
  if (!amplitudeConfig.enabled || !amplitudeConfig.apiKey) return Promise.resolve(false);
  if (!initialization) {
    initialization = amplitude.initAll(amplitudeConfig.apiKey, {
      serverZone: amplitudeConfig.serverZone,
      analytics: { autocapture: true },
      sessionReplay: { sampleRate: 1 },
      engagement: { skip: false },
    }).then(() => true);
  }
  return initialization;
}
export async function identifySignedInUser(user) {
  if (!amplitudeConfig.enabled) return;
  await initializeAmplitude();
  amplitude.setUserId(user.id);
  const identify = new amplitude.Identify()
    .set('tier', user.tier)
    .set('signup_date', user.signupDate)
    .set('lifetime_spend', user.lifetimeSpend)
    .set('persona', user.persona || 'custom');
  amplitude.identify(identify);
}
export function clearAmplitudeUser() {
  if (amplitudeConfig.enabled) amplitude.reset();
}
// Custom track calls intentionally wait for the Braze-derived taxonomy.
