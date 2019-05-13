import Link from 'next/link';
const Landing = props => {
  return (
    <>
      <div>
        <h1>Welcome to YASP</h1>
        <Link href="/login">
          <a>Login</a>
        </Link>
        <Link href="/register">
          <a>Register</a>
        </Link>
      </div>
    </>
  );
};

export default Landing;
