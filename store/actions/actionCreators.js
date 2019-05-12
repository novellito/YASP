import axios from 'axios';

export const setUser = ({ id, email, username }) => {
  return {
    type: 'SET_USER',
    id,
    email,
    username
  };
};

export const localLogin = (email, password) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/api/local/login', {
        email,
        password
      });
      localStorage.setItem('jwt', data.user.token);
      localStorage.setItem('refreshToken', data.user.refreshToken);
      dispatch(
        setUser({
          id: data.user._id,
          email: data.user.email,
          username: data.user.username
        })
      );
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
      dispatch(
        setUser({
          id: data.user._id,
          email: data.user.email,
          username: data.user.username
        })
      );
      //   console.log(data);
      return data;
    } catch (err) {
      return err;
    }
  };
};

export const logout = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('refreshToken');
  return {
    type: 'USER_LOGOUT'
  };
};
