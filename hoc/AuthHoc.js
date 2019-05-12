import { connect } from 'react-redux';
import { useEffect } from 'react';
import Router from 'next/router';

import axios from 'axios';
import * as actionCreators from '../store/actions/actionCreators';
const createGetRequest = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    'Content-Type': 'application/json'
  };

  return await axios.get('/api/user/profile', { headers });
};

export default function(ChildComponent) {
  const Authenticate = props => {
    const { isLoggedIn } = props;
    useEffect(() => {
      const createGet = async () => {
        if (!isLoggedIn) {
          try {
            const { data } = await createGetRequest();
            if (data) {
              const { username, id, email } = data.user;
              props.setUser({ username, id, email });
            }
          } catch (err) {
            Router.push('/login');
          }
        }
      };
      createGet();
    }, []);

    return (
      <div>{isLoggedIn ? <ChildComponent {...props} /> : 'not logged in!'}</div>
    );
  };

  const mapStateToProps = state => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      userId: state.login.userId,
      username: state.login.username,
      email: state.login.email
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(actionCreators.logout()),
      setUser: user =>
        dispatch(
          actionCreators.setUser({
            id: user.id,
            email: user.email,
            username: user.username
          })
        )
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}
