import { render, cleanup, fireEvent, wait } from 'react-testing-library';
import { Forms } from '../components/Forms';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import Router from 'next/router';
const mockedRouter = { push: jest.fn(() => 'foo') };
Router.router = mockedRouter;
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

describe('Forms Suite', () => {
  mock.onPost('/api/local/signup').reply(200, {
    user: mockUser
  });
  let store;
  beforeEach(() => {
    store = mockStore({
      login: {
        isLoggedIn: false,
        userId: null,
        email: null,
        username: null
      }
    });
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    cleanup();
  });

  // https://github.com/testing-library/react-testing-library/issues/281
  const originalError = console.error;
  beforeAll(() => {
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
        return;
      }
      originalError.call(console, ...args);
    };
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('should match the login page snapshot', () => {
    const elem = render(<Forms router={{ asPath: '/login' }} />);

    expect(elem).toMatchSnapshot();
  });

  it('should register a new user and navigate to /home', async () => {
    const { container, getByText } = render(
      <Forms router={{ asPath: '/register' }} setUser={jest.fn()} register />
    );
    const spy = jest.spyOn(Storage.prototype, 'setItem');
    const [email, username, password] = container.getElementsByTagName('input');

    fireEvent.change(email, {
      target: { value: 'foo@test.com' }
    });
    fireEvent.change(username, {
      target: { value: 'foo' }
    });
    fireEvent.change(password, {
      target: { value: 'foo123' }
    });

    const registerBtn = getByText('Register');
    fireEvent.click(registerBtn);

    await wait(() => {
      expect(spy).toHaveBeenCalledTimes(2);
      expect(localStorage.length).toEqual(2);
      expect(mockedRouter.push).toHaveBeenCalledWith('/home');
    });
  });

  it('should navigate a user to /home when logging in', async () => {
    const { container, getByText } = render(
      <Forms
        router={{ asPath: '/login' }}
        localLogin={jest.fn(() => ({
          user: {}
        }))}
      />
    );
    const [email, password] = container.getElementsByTagName('input');

    fireEvent.change(email, {
      target: { value: 'foo@test.com' }
    });

    fireEvent.change(password, {
      target: { value: 'foo123' }
    });

    const loginBtn = getByText('Sign In');
    fireEvent.click(loginBtn);

    await wait(() => {
      expect(mockedRouter.push).toHaveBeenCalledWith('/home');
    });
  });

  it('should show invalid credentials when logging in', async () => {
    const { container, getByText } = render(
      <Forms router={{ asPath: '/login' }} localLogin={jest.fn(() => 'no')} />
    );
    const [email, password] = container.getElementsByTagName('input');
    fireEvent.change(email, {
      target: { value: 'foo@test.com' }
    });

    fireEvent.change(password, {
      target: { value: 'foo123' }
    });

    const loginBtn = getByText('Sign In');
    fireEvent.click(loginBtn);

    await wait(() => {
      expect(mockedRouter.push).not.toHaveBeenCalled();
      expect(getByText('Invalid Credentials!')).toBeTruthy();
    });
  });

  it('should indicate that the email entered is INVALID', async () => {
    const { container, getByText } = render(
      <Forms router={{ asPath: '/login' }} />
    );
    const [email] = container.getElementsByTagName('input');

    fireEvent.change(email, {
      target: { value: 'foo' }
    });
    fireEvent.blur(email);

    expect(getByText('Invalid email')).toBeTruthy();
    expect(getByText('Please enter a valid email address')).toBeTruthy();
  });
});
