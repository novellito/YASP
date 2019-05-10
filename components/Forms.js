import { useState } from 'react';
import { withRouter } from 'next/router';
import * as actionCreators from '../store/actions/actionCreators';
import axios from 'axios';
import { connect } from 'react-redux';

const Forms = props => {
  const [emailObj, setEmail] = useState({ email: '', valid: true });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const checkEmailValidity = () => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(emailObj.email).toLowerCase())) {
      setEmail({ ...emailObj, valid: true });
      return;
    }
    setEmail({ ...emailObj, valid: false });
  };

  const submitForm = async () => {
    if (props.router.asPath === '/register') {
      try {
        const { data } = await axios.post('/api/local/signup', {
          email: emailObj.email,
          username,
          password
        });
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    } else {
      //localLogin
      try {
        const foo = await props.localLogin(emailObj.email, password);
        console.log(foo.name); // == Error
      } catch (err) {
        console.log('err', err);
      }
      // push route rhere
    }
  };

  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        type="text"
        name="email"
        onBlur={checkEmailValidity}
        onChange={e =>
          setEmail({ ...emailObj, email: e.target.value, valid: true })
        }
        value={emailObj.email}
      />
      {emailObj.email}
      <br />
      {!emailObj.valid ? 'Invalid email!!' : ''}
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
      <button onClick={submitForm}>Submit</button>
    </div>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    localLogin: (email, password) =>
      dispatch(actionCreators.localLogin(email, password)),
    socialLogin: platform => dispatch(actionCreators.socialLogin(platform))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Forms));
