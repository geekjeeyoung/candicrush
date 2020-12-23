import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {combineReducers} from 'redux';
import {auth} from '../../Core/onboarding/redux/auth';
import {feed} from '../../Core/socialgraph/feed/redux';
import RootNavigator from '../../navigators/RootNavigator';
import {chat} from '../../Core/chat/redux';
import {friends} from '../../Core/socialgraph/friendships/redux';
import {userReports} from '../../Core/user-reporting/redux';
import {notifications} from '../../Core/notifications/redux';

const LOG_OUT = 'LOG_OUT';

const navReducer = createNavigationReducer(RootNavigator);

// combine reducers to build the state
const appReducer = combineReducers({
  nav: navReducer,
  auth: auth,
  feed: feed,
  chat: chat,
  friends: friends,
  userReports: userReports,
  notifications: notifications,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
