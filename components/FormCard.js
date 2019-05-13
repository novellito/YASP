import Forms from '../components/Forms';
import { Card } from 'semantic-ui-react';

const Register = props => {
  return (
    <div>
      <Card>
        <Card.Content>
          <Card.Header content={<h1 className="header">{props.title}</h1>} />
          <Card.Description content={<>{props.type}</>} />
        </Card.Content>
      </Card>
      <style jsx>{`
        .header {
          margin: 15px 0;
        }
      `}</style>
    </div>
  );
};

export default Register;
