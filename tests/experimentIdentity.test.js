import test from 'node:test';
import assert from 'node:assert/strict';
import {makeExperimentUser} from '../src/experimentIdentity.js';

test('anonymous session uses only the current device ID', () => {
  assert.deepEqual(makeExperimentUser(null, 'guest-device'), {user_id: undefined, device_id: 'guest-device'});
});

test('signed-in PoC account fetches with its user ID and current device', () => {
  assert.deepEqual(makeExperimentUser({id: 'repeat'}, 'guest-device'), {user_id: 'repeat', device_id: 'guest-device'});
});

test('external Device ID journey remains anonymous', () => {
  assert.deepEqual(makeExperimentUser({id: 'device:abc', amplitudeDeviceId: 'abc'}, 'old-device'), {user_id: undefined, device_id: 'abc'});
});

test('external User ID and Device ID take precedence over local persona', () => {
  assert.deepEqual(makeExperimentUser({id: 'amplitude:alice', amplitudeUserId: 'alice', amplitudeDeviceId: 'linked-device'}, 'old-device'), {user_id: 'alice', device_id: 'linked-device'});
});
