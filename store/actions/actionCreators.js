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
          username: data.user.user
        })
      );
      return data;
    } catch (err) {
      return err;
    }
  };
};

export const logout = () => {
  return async dispatch => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        'Content-Type': 'application/json'
      };
      await axios.delete(`/api/token`, { headers });
      dispatch(clearCurrentUser());
    } catch (err) {
      return err;
    }
  };
};

export const clearCurrentUser = () => {
  localStorage.removeItem('jwt');
  localStorage.removeItem('refreshToken');
  return {
    type: 'USER_LOGOUT'
  };
};
