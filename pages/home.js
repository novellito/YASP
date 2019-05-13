import authenticate from '../hoc/AuthHoc';
import { useState } from 'react';
import Router from 'next/router';
import axios from 'axios';
import { createGetRequest } from '../utils/index';
import { Button } from 'semantic-ui-react';

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

  // The function is an example of how the client requests for a new jwt after
  // the current one expires.
  const retrieveUserInfo = async () => {
    try {
      const { data } = await createGetRequest();

      if (data) {
        console.log('User is still valid');
        console.log(data);
      }
    } catch (err) {
      // the jwt has expired so check for refreshToken
      setValid(false);
      // use setTimeout to visualize the token status change
      await refetchToken(props.email);
      setTimeout(() => {
        setValid(true);
      }, 1500);
    }
  };

  return (
    <section id="home">
      <h1>Welcome Home {props.username} !</h1>
      <h2>Your Info: </h2>
      <p>email: {props.email}</p>
      <p>id: {props.userId}</p>
      <p>Is token valid: {isValid ? 'valid' : 'not valid'}</p>
      <Button onClick={retrieveUserInfo}>Get My Info</Button>
      <style jsx>{`
        #home {
          padding: 20px;
        }
      `}</style>
    </section>
  );
};

export default authenticate(Home);
