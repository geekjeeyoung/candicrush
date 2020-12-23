import CHFeedActionsConstants from './types';

const initialState = {
  mainFeedPosts: null,
  discoverFeedPosts: null,
  mainFeedPostReactions: null,
  currentUserFeedPosts: null,
  mainStories: null,
  didSubscribeToMainFeed: false,
};

export const feed = (state = initialState, action) => {
  switch (action.type) {
    case CHFeedActionsConstants.SET_MAIN_FEED_POSTS:
      return {...state, mainFeedPosts: [...action.data]};
    case CHFeedActionsConstants.SET_CURRENT_USER_FEED_POSTS:
      return {...state, currentUserFeedPosts: [...action.data]};
    case CHFeedActionsConstants.SET_DISCOVER_FEED_POSTS:
      return {...state, discoverFeedPosts: [...action.data]};
    case CHFeedActionsConstants.SET_MAIN_FEED_POST_REACTIONS:
      return {...state, mainFeedPostReactions: [...action.data]};
    case CHFeedActionsConstants.SET_MAIN_STORIES:
      return {...state, mainStories: [...action.data]};
    case CHFeedActionsConstants.DID_SUBSCRIBE:
      return {...state, didSubscribeToMainFeed: true};
    case 'LOG_OUT':
      return initialState;
    default:
      return state;
  }
};
