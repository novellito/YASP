import * as actionCreators from '../store/actions/actionCreators';
import axios from 'axios';
import thunk from 'redux-thunk';

import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = new MockAdapter(axios);

const mockUser = {
  token: '123',
  refreshToken: '134343',
  _id: '777',
  email: 'foobar@test.com',
  user: 'foobar'
};

mock.onPost('/api/local/login').reply(200, {
  user: mockUser
});

mock.onDelete('/api/token').reply(200);

describe('Action creators suite', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      isLoggedIn: false,
      userId: null,
      email: null,
      username: null
    });
  });
  afterEach(() => {
    localStorage.clear();
  });

  it('should set local storage items and SET_USER after logging in successfully', () => {
    const expectedAction = {
      type: 'SET_USER',
      id: mockUser._id,
      email: mockUser.email,
      username: mockUser.user
    };

    return store.dispatch(actionCreators.localLogin()).then(res => {
      expect(localStorage.getItem('jwt')).toEqual('123');
      expect(localStorage.getItem('refreshToken')).toEqual('134343');
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  it('should create an action to set user information', () => {
    const expectedAction = {
      type: 'SET_USER',
      id: mockUser._id,
      email: mockUser.email,
      username: mockUser.user
    };

    expect(
      actionCreators.setUser({
        email: 'foobar@test.com',
        id: '777',
        username: 'foobar'
      })
    ).toEqual(expectedAction);
  });

  it('should make a call to delete the users token and then call USER_LOGOUT', () => {
    const expectedAction = {
      type: 'USER_LOGOUT'
    };

    return store.dispatch(actionCreators.logout()).then(res => {
      expect(localStorage.length).toEqual(0);
      expect(store.getActions()[0]).toEqual(expectedAction);
    });
  });

  it('should create an action to logout the user and clear local storage', () => {
    const expectedAction = {
      type: 'USER_LOGOUT'
    };

    expect(actionCreators.clearCurrentUser()).toEqual(expectedAction);
  });
});
