import { useEffect, useState } from 'react';
import Forms from '../components/Forms';
import { connect } from 'react-redux';
import FormCard from '../components/FormCard';
import Socials from '../components/SocialLogins';
import authenticate from '../hoc/AuthHoc';
import io from 'socket.io-client';
import Router, { withRouter } from 'next/router';
import * as actionCreators from '../store/actions/actionCreators';
import { setTokens } from '../utils/index';

const BASE_URL = 'http://localhost:5000';
const socket = io(BASE_URL);

const openSocialWindow = social => {
  const url = `${BASE_URL}/api/${social}/login?socketId=${
    socket.id
  }&social=${social}`;
  return window.open(url, '_blank');
};

let popup;
export const Login = props => {
  const [areAuthsDisabled, setAuthStatus] = useState(false);
  const [selectedSocial, setSelectedSocial] = useState(null);

  useEffect(() => {
    socket.on(selectedSocial, user => {
      const { token, refreshToken, email, username, _id } = user;
      popup.close();
      setTokens(token, refreshToken);
      props.setUser({ id: _id, email, username });
      Router.push('/home');
    });
    return () => {
      // on unmounting
      setAuthStatus(false);
      setSelectedSocial(null);
    };
  }, [selectedSocial, areAuthsDisabled]);

  const checkWindowIfClosed = () => {
    const check = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        setAuthStatus(false);
        setSelectedSocial(null);
      }
    }, 1000);
  };

  const startAuth = social => {
    if (!areAuthsDisabled) {
      setSelectedSocial(social);
      popup = openSocialWindow(social);
      checkWindowIfClosed();
      setAuthStatus(true);
    }
  };

  return (
    <FormCard
      title="Login"
      type={
        <>
          <Forms />
          <Socials disabled={areAuthsDisabled} login={startAuth} />
        </>
      }
    />
  );
};
const mapDispatchToProps = dispatch => {
  return {
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

export default connect(
  null,
  mapDispatchToProps
)(withRouter(authenticate(Login, true)));
