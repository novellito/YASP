import Link from 'next/link';
import authenticate from '../hoc/AuthHoc';
import { connect } from 'react-redux';
import Router from 'next/router';
const Home = props => {
  const logout = () => {
    props.logout();
    Router.push('/login');
  };

  return (
    <div>
      <h1>Welcome Home!</h1>
      {props.user}
      <br />
      {props.userId}
      <button onClick={logout}>Logout</button>
      <Link href="/register">
        <a>Register</a>
      </Link>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(authenticate(Home));
