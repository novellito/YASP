import { useState } from 'react';

const Forms = props => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      {/* todo - add regex validation for email!!! */}
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        onChange={e => setEmail(e.target.value)}
        value={email}
      />
      {email}
      {props.register ? (
        <>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            onChange={e => setUsername(e.target.value)}
            value={username}
          />
          {username}
        </>
      ) : (
        ''
      )}
      <label htmlFor="password">Password</label>
      <input
        type="text"
        name="password"
        onChange={e => setPassword(e.target.value)}
        value={password}
      />
      {password}
      {/* <button onClick={this.handleSubmit}>Submit</button> */}
    </div>
  );
};

export default Forms;
