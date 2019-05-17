// import React from 'react'
import AuthHOC from '../hoc/AuthHoc';
import { render, debug, cleanup, getByTestId } from 'react-testing-library';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Router from 'next/router';
// const mockedRouter = { push: () => {} };
const mockedRouter = { push: jest.fn(() => 'foo') };
Router.router = mockedRouter;

import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
const mock = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockUser = {
  token: '123',
  refreshToken: '134343',
  id: '777',
  email: 'foobar@test.com',
  username: 'foobar'
};

mock.onGet('/api/user/profile').reply(200, {
  user: mockUser
});

const TestComponent = () => <h1>Test</h1>;

describe('Auth HOC Suite', () => {
  let store;
  let ComponentRendered;
  beforeEach(() => {
    store = mockStore({
      login: {
        isLoggedIn: false,
        userId: null,
        email: null,
        username: null
      }
    });
    ComponentRendered = AuthHOC(TestComponent);
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    cleanup();
  });

  it('should redirect to /login', () => {
    render(<ComponentRendered store={store} router={{ asPath: '/login' }} />);
    expect(mockedRouter.push).toHaveBeenCalledWith('/login');
  });

  it('should redirect to /register', () => {
    render(
      <ComponentRendered store={store} router={{ asPath: '/register' }} />
    );
    expect(mockedRouter.push).toHaveBeenCalledWith('/register');
  });

  it('should load the component when loginRegister is true', async () => {
    const TestLoginComponent = () => <h1 data-testid="child-comp">Login</h1>;
    const ComponentRendered = AuthHOC(TestLoginComponent, true);
    const { getByTestId } = render(
      <ComponentRendered store={store} router={{ asPath: '/home' }} />
    );
    const testLogin = getByTestId('child-comp');
    expect(testLogin).toBeTruthy();
  });
});
