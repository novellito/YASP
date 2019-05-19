import { connect } from 'react-redux';
import { useEffect } from 'react';
import Router, { withRouter } from 'next/router';
import { createGetRequest } from '../utils/index';
import * as actionCreators from '../store/actions/actionCreators';

export default function(ChildComponent, loginRegister = false) {
  const Authenticate = props => {
    const { isLoggedIn } = props;
    useEffect(() => {
      const checkAuthStatus = async () => {
        // If nothing in local store - immediately redirect to login page
        if (localStorage.length !== 2) {
          const path = props.router.asPath;
          if (path === '/register' || path === '/login') {
            Router.push(path);
            return;
          }
        }
        if (!isLoggedIn) {
          try {
            const { data } = await createGetRequest();
            if (data) {
              const { username, _id, email } = data.user;
              props.setUser({ username, id: _id, email });
              Router.push('/home');
            }
          } catch (err) {
            console.log(err);
            localStorage.clear();
            Router.push('/login');
          }
        }
      };
      checkAuthStatus();
    }, []);

    return (
      <div>
        {isLoggedIn || loginRegister ? <ChildComponent {...props} /> : ''}
      </div>
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
  )(withRouter(Authenticate));
}
