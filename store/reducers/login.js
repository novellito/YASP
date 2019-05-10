// import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoggedIn: false,
  userId: null,
  username: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        isLoggedIn: true,
        userId: action.userId,
        user: action.user
      };
    case 'USER_LOGIN':
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        user: null
      };
    case 'USER_LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        userId: null,
        user: null
      };

    default:
      return state;
  }
};

export default reducer;
