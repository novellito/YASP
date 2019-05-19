import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'semantic-ui-react';
import { createGetRequest } from '../utils/index';
import authenticate from '../hoc/AuthHoc';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

export const Landing = props => {
  useEffect(() => {
    const checkAuthStatus = async () => {
      // if (!isLoggedIn) {
      try {
        const { data } = await createGetRequest();
        if (data) {
          console.log(data);
          const { username, id, email } = data.user;
          props.setUser({ username, id, email });
        }
      } catch (err) {
        // console.log(err);
        // localStorage.clear();
        // Router.push('/login');
      }
      // }
    };
    checkAuthStatus();
  }, []);

  return (
    <>
      <section id="landing">
        <h1>Welcome to YASP 🚀</h1>
        {props.isLoggedIn ? (
          <Link href="/home">
            <Button as="a" className="ui button" color="blue">
              Home
            </Button>
          </Link>
        ) : (
          <>
            <Link href="/login">
              <Button as="a" className="ui button" color="blue">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button as="a" className="ui button" color="teal">
                Register
              </Button>
            </Link>
          </>
        )}
        <style jsx>{`
          #landing {
            padding: 20px;
          }
        `}</style>
      </section>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn
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

// export default Landing;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
