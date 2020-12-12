import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import rootReducer from '../reducers';

const middleware = createReactNavigationReduxMiddleware((state) => state.nav);

const configureStore = () =>
  createStore(rootReducer, applyMiddleware(thunk, middleware));

export default configureStore;
