import Forms from '../components/Forms';
import Link from 'next/link';

const Register = props => {
  return (
    <div>
      Register
      <Link href="/login">
        <a>Login</a>
      </Link>
      <Link href="/">
        <a>Landing</a>
      </Link>
      <Forms register />
    </div>
  );
};

export default Register;
