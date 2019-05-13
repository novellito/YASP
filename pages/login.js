import Forms from '../components/Forms';
import Link from 'next/link';
import { Card } from 'semantic-ui-react';

const Login = props => {
  const openPopup = () => {
    // const { provider, socket } = this.props;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `http://localhost:5000/api/facebook/login`;

    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  };
  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header content={<h1>Login</h1>} />
          <Card.Description
            content={
              <>
                <Link href="/register">
                  <a>Register Page</a>
                </Link>
                <Link href="/">
                  <a>Landing</a>
                </Link>
                {/* <button onClick={openPopup}>FACEBOOK</button> */}
                <a href="http://localhost:5000/api/facebook/login">
                  Facebook Login
                </a>
                <Forms />
              </>
            }
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default Login;
