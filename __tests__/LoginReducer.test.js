import reducer from '../store/reducers/login';

describe('Login Reducers Suite', () => {
  it('should handle SET_USER', () => {
    const mockUser = {
      id: '777',
      email: 'foobar@test.com',
      username: 'foobar'
    };
    const expectedState = {
      isLoggedIn: true,
      userId: '777',
      email: 'foobar@test.com',
      username: 'foobar'
    };

    const { id, email, username } = mockUser;
    expect(
      reducer(expectedState, { type: 'SET_USER', id, email, username })
    ).toEqual(expectedState);
  });

  it('should handle USER_LOGOUT', () => {
    const initialState = {
      isLoggedIn: true,
      userId: '777',
      email: 'foobar@test.com',
      username: 'foobar'
    };

    expect(reducer(initialState, { type: 'USER_LOGOUT' })).toEqual({
      isLoggedIn: false,
      userId: null,
      email: null,
      username: null
    });
  });
});
