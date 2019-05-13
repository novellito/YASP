import Link from 'next/link';
import authenticate from '../hoc/AuthHoc';
import { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { createGetRequest } from '../utils/index';
const refetchToken = async email => {
  try {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
      'Content-Type': 'application/json'
    };
    const { data } = await axios.post('/api/token', { email }, { headers });
    localStorage.setItem('jwt', data.token);
    localStorage.setItem('refreshToken', data.refreshToken);
    console.log('new tokens set!');
    return data;
  } catch (err) {
    console.log('Definitely not authorized!');
    Router.push('/login');
  }
};

const Home = props => {
  const [isValid, setValid] = useState(false);

  const logout = () => {
    props.logout();
    Router.push('/login');
  };

  const retrieveUserInfo = async () => {
    try {
      const { data } = await createGetRequest();

      if (data) {
        console.log('User is still valid');
        // here we will trigger to show the userinfo!
      }
    } catch (err) {
      // the jwt has expired so check for refreshToken
      await refetchToken(props.email);
      setValid(true);
    }
  };

  return (
    <div>
      <h1>Welcome Home!</h1>
      {props.user}
      <br />
      {props.userId}

      <h1>{isValid ? 'VALID' : 'INVALID'}</h1>
      <button onClick={retrieveUserInfo}>Get My Info</button>
    </div>
  );
};

export default authenticate(Home);
