import axios from 'axios';
export const createGetRequest = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  };
  return axios.get('/api/user/profile', { headers });
};
