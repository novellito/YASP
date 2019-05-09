import Forms from '../components/Forms';
import Link from 'next/link';

const Login = props => {
  return (
    <div>
      Login
      <Link href="/register">
        <a>Register Page</a>
      </Link>
      <Link href="/">
        <a>Landing</a>
      </Link>
      <Forms />
    </div>
  );
};

export default Login;
