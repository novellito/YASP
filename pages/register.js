import Forms from '../components/Forms';
import Link from 'next/link';
import { Card } from 'semantic-ui-react';

const Register = props => {
  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header content={<h1>Register</h1>} />
          <Card.Description
            content={
              <>
                <Link href="/">
                  <a>Landing</a>
                </Link>

                <Forms register />
              </>
            }
          />
        </Card.Content>
      </Card>
    </div>
  );
};

export default Register;
