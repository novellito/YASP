import axios from 'axios';

export const setUser = (userId, user) => {
  return {
    type: 'SET_USER',
    userId,
    user
  };
};

export const localLogin = (email, password) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/local/login', {
        email,
        password
      });
      // TODO: set the localstorage
      dispatch(setUser(data.user._id, data.user.email));
      //   console.log(data);
      return data;
    } catch (err) {
      return err;
    }
  };
};

export const socialLogin = platform => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/${platform}/login`, {
        email,
        password
      });
      // dispatch here & set the localstorage
      dispatch(setUser(data.user._id, data.user.email));
      //   console.log(data);
      return data;
    } catch (err) {
      return err;
    }
  };
  //   return {
  //     type: 'USER_LOGOUT'
  //   };
};

export const logout = () => {
  //clear local storeage here!
  return {
    type: 'USER_LOGOUT'
  };
};
