import CHNotificationActionsConstants from './types';

export const setNotifications = (data) => ({
  type: CHNotificationActionsConstants.SET_NOTIFICATIONS,
  data,
});

export const setNotificationListenerDidSubscribe = () => ({
  type: CHNotificationActionsConstants.DID_SUBSCRIBE,
});
