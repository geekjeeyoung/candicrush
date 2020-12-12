import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {combineReducers} from 'redux';
import RootNavigator from '../../navigators/RootNavigator';

const LOG_OUT = 'LOG_OUT';

const navReducer = createNavigationReducer(RootNavigator);

// combine reducers to build the state
const appReducer = combineReducers({
  nav: navReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
