import Link from 'next/link';
import authenticate from '../hoc/AuthHoc';
import { useState } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import axios from 'axios';
import * as actionCreators from '../store/actions/actionCreators';

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

const createGetRequest = () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  };
  return axios.get('/api/user/profile', { headers });
};

const Home = props => {
  const [isValid, setValid] = useState(false);

  const logout = () => {
    props.logout();
    Router.push('/login');
  };

  const retrieveUserInfo = async () => {
    try {
      const data = await createGetRequest();
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
      <button onClick={logout}>Logout</button>
      <Link href="/register">
        <a>Register</a>
      </Link>
      <h1>{isValid ? 'VALID' : 'INVALID'}</h1>
      <button onClick={retrieveUserInfo}>Get My Info</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(authenticate(Home));
