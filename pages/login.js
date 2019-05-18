import { useEffect, useState } from 'react';
import Forms from '../components/Forms';
import FormCard from '../components/FormCard';
import Socials from '../components/SocialLogins';
import authenticate from '../hoc/AuthHoc';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const openPopup = social => {
  const width = 600;
  const height = 600;
  const left = window.innerWidth / 2 - width / 2;
  const top = window.innerHeight / 2 - height / 2;
  const url = `http://localhost:5000/api/${social}/login?socketId=${socket.id}`;
  return window.open(
    url,
    '',
    `toolbar=no, location=no, directories=no, status=no, menubar=no,
    scrollbars=no, resizable=no, copyhistory=no, width=${width},
    height=${height}, top=${top}, left=${left}`
  );
};
export const Login = props => {
  let popup;
  const [areAuthsDisabled, setAuthStatus] = useState(false);
  useEffect(() => {
    // ! TODO: make this dynamic!
    socket.on('facebook', user => {
      this.popup.close();
      console.log(user);
      // ! TODO: add redirect & jwt logic here!
    });
  }, []);

  const checkPopup = () => {
    const check = setInterval(() => {
      if (!popup || popup.closed || popup.closed === undefined) {
        clearInterval(check);
        setAuthStatus(false);
      }
    }, 1000);
  };

  const startAuth = social => {
    if (!areAuthsDisabled) {
      popup = openPopup(social);
      checkPopup();
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
