export const makeExperimentUser = (user, currentDeviceId) => ({
  user_id: user?.amplitudeUserId || (user?.amplitudeDeviceId ? undefined : user?.id),
  device_id: user?.amplitudeDeviceId || currentDeviceId,
});
