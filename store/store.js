import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import loginReducer from './reducers/login';

export const store = createStore(
  loginReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
