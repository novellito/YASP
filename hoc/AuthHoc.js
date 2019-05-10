import { connect } from 'react-redux';
import { useEffect } from 'react';
import Router from 'next/router';

import axios from 'axios';
import * as actionCreators from '../store/actions/actionCreators';

export default function(ChildComponent) {
  const Authenticate = props => {
    const { isLoggedIn } = props;

    useEffect(() => {
      if (!isLoggedIn) Router.push('/login');
    }, []);

    return (
      <div>{isLoggedIn ? <ChildComponent {...props} /> : 'not logged in!'}</div>
    );
  };

  const mapStateToProps = state => {
    return {
      isLoggedIn: state.login.isLoggedIn,
      userId: state.login.userId,
      user: state.login.user
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(actionCreators.logout())
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}
