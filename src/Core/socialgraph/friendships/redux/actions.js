import CHFriendshipActionsConstants from './types';

export const setFriendships = (data) => ({
  type: CHFriendshipActionsConstants.SET_FRIENDSHIPS,
  data,
});

export const setFriends = (data) => ({
  type: CHFriendshipActionsConstants.SET_FRIENDS,
  data,
});

export const setFriendsListenerDidSubscribe = () => ({
  type: CHFriendshipActionsConstants.DID_SUBSCRIBE,
});
