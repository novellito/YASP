import { Card } from 'semantic-ui-react';

const Register = props => {
  return (
    <div className="card-container">
      <Card style={{ width: '400px', padding: '20px' }}>
        <Card.Content>
          <Card.Header content={<h1 className="header">{props.title}</h1>} />
          <Card.Description content={<>{props.type}</>} />
        </Card.Content>
      </Card>
      <style jsx>{`
        .card-container {
          display: flex;
          justify-content: center;
        }
        .header {
          margin: 15px 0;
        }
      `}</style>
    </div>
  );
};

export default Register;
