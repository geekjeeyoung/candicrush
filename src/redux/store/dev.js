import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import rootReducer from '../reducers';

const logger = createLogger();
const middleware = createReactNavigationReduxMiddleware((state) => state.nav);

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = () =>
  createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, logger, middleware)),
  );
export default configureStore;
