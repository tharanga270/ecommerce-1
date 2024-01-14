import { createStore, applyMiddleware, compose } from 'redux';
//import { legacy_createStore as createStore } from 'redux';
//import thunk from 'redux-thunk';
import { thunk } from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
import rootreducers from './redux/reducers/main';

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootreducers,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
