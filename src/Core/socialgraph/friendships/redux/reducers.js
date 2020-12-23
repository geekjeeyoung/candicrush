import CHFriendshipActionsConstants from './types';

const initialState = {
  friends: [],
  friendships: [],
  didSubscribeToFriendships: false,
};

export const friends = (state = initialState, action) => {
  switch (action.type) {
    case CHFriendshipActionsConstants.SET_FRIENDS:
      return {...state, friends: [...action.data]};
    case CHFriendshipActionsConstants.SET_FRIENDSHIPS:
      return {...state, friendships: [...action.data]};
    case CHFriendshipActionsConstants.DID_SUBSCRIBE:
      return {...state, didSubscribeToFriendships: true};
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};
