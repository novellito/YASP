const initialState = {
  isLoggedIn: false,
  userId: null,
  email: null,
  username: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        isLoggedIn: true,
        userId: action.id,
        email: action.email,
        user: action.username
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        email: null,
        username: null
      };

    default:
      return state;
  }
};

export default reducer;
