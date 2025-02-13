import CHNotificationActionsConstants from './types';

const initialState = {
  notifications: null,
};

export const notifications = (state = initialState, action) => {
  switch (action.type) {
    case CHNotificationActionsConstants.SET_NOTIFICATIONS:
      return {...state, notifications: [...action.data]};
    case CHNotificationActionsConstants.DID_SUBSCRIBE:
      return {...state, didSubscribeToNotifications: true};
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};
