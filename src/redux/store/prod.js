import {createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middleware = createReactNavigationReduxMiddleware((state) => state.nav);

const configureStore = () => {
  createStore(rootReducer, applyMiddleware(thunk, middleware));
};

export default configureStore;
