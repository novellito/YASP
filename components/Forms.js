import { useState } from 'react';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';
import { Button, Form, Message } from 'semantic-ui-react';
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
        localStorage.setItem('jwt', data.user.token);
        localStorage.setItem('refreshToken', data.user.refreshToken);
        props.setUser({
          id: data.user._id,
          username: data.user.username,
          email: data.user.email
        });
        Router.push('/home');
      } catch (err) {
        console.log(err);
      }
    } else {
      // User is logging in
      const { user } = await props.localLogin(emailObj.email, password);
      if (user) {
        Router.push('/home');
      }
    }
  };

  return (
    <Form error>
      <Form.Field>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="test@test.com"
          onBlur={checkEmailValidity}
          onChange={e =>
            setEmail({ ...emailObj, email: e.target.value, valid: true })
          }
          value={emailObj.email}
        />
      </Form.Field>
      {!emailObj.valid ? (
        <Message
          error
          header="Invalid email"
          content="Please enter a valid email address"
        />
      ) : (
        ''
      )}
      {props.register ? (
        <>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
            {username}
          </Form.Field>
        </>
      ) : (
        ''
      )}
      <Form.Field>
        <label htmlFor="password">Password</label>
        <input
          type="text"
          name="password"
          onChange={e => setPassword(e.target.value)}
          value={password}
        />
        <div className="subtext">
          {props.router.asPath === '/login' ? (
            <>
              <span>Don't have an account? </span>
              <Link href="/register">
                <a>Register here</a>
              </Link>
            </>
          ) : (
            <>
              <span>Already have an account? </span>
              <Link href="/login">
                <a>Log in here</a>
              </Link>
            </>
          )}
        </div>
      </Form.Field>
      {password}
      <div className="submit-btn">
        <Button className="ui button " onClick={submitForm}>
          {props.router.asPath === '/register' ? 'Register' : 'Sign In'}
        </Button>
      </div>
      <style jsx>{`
        .subtext {
          font-size: 0.9em;
        }
        .submit-btn {
          margin: 10px;
          text-align: center;
        }
      `}</style>
    </Form>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    localLogin: (email, password) =>
      dispatch(actionCreators.localLogin(email, password)),
    setUser: user =>
      dispatch(
        actionCreators.setUser({
          id: user.id,
          email: user.email,
          username: user.username
        })
      ),
    socialLogin: platform => dispatch(actionCreators.socialLogin(platform))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Forms));
