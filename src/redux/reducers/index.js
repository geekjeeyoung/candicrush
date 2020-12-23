import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {combineReducers} from 'redux';
import {auth} from '../../Core/onboarding/redux/auth';
import {feed} from '../../Core/socialgraph/feed/redux';
import RootNavigator from '../../navigators/RootNavigator';

const LOG_OUT = 'LOG_OUT';

const navReducer = createNavigationReducer(RootNavigator);

// combine reducers to build the state
const appReducer = combineReducers({
  nav: navReducer,
  auth: auth,
  feed: feed,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
