import { useEffect, useState } from 'react';
import Forms from '../components/Forms';
import FormCard from '../components/FormCard';
import Socials from '../components/SocialLogins';
import authenticate from '../hoc/AuthHoc';
import io from 'socket.io-client';

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
      popup.close();
      console.log(user);
      // ! TODO: add redirect & jwt logic here!
    });
  }, [selectedSocial]);

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

export default authenticate(Login, true);
