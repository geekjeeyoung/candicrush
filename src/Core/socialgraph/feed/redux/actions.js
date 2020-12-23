import CHFeedActionsConstants from './types';

export const setMainFeedPosts = (data) => ({
  type: CHFeedActionsConstants.SET_MAIN_FEED_POSTS,
  data,
});

export const setCurrentUserFeedPosts = (data) => ({
  type: CHFeedActionsConstants.SET_CURRENT_USER_FEED_POSTS,
  data,
});

export const setDiscoverFeedPosts = (data) => ({
  type: CHFeedActionsConstants.SET_DISCOVER_FEED_POSTS,
  data,
});

export const setMainFeedPostReactions = (data) => ({
  type: CHFeedActionsConstants.SET_MAIN_FEED_POST_REACTIONS,
  data,
});

export const setMainStories = (data) => ({
  type: CHFeedActionsConstants.SET_MAIN_STORIES,
  data,
});

export const setFeedListenerDidSubscribe = () => ({
  type: CHFeedActionsConstants.DID_SUBSCRIBE,
});
