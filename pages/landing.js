import Link from 'next/link';
import { Button } from 'semantic-ui-react';

export const Landing = props => {
  return (
    <>
      <section id="landing">
        <h1>Welcome to YASP 🚀</h1>
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
        <style jsx>{`
          #landing {
            padding: 20px;
          }
        `}</style>
      </section>
    </>
  );
};

export default Landing;
