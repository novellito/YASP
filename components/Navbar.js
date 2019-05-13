import { Image, Menu } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';
import Link from 'next/link';

const Navbar = props => {
  return (
    <>
      <Menu inverted>
        <Menu.Item>
          <Link href="/">
            <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          {!props.isLoggedIn ? (
            <>
              <Menu.Item
                content={
                  <Link href="/login">
                    <a>Login</a>
                  </Link>
                }
              />
              <Menu.Item
                content={
                  <Link href="/register">
                    <a>Register</a>
                  </Link>
                }
              />
            </>
          ) : (
            <Link href="/login">
              <Menu.Item as="a" onClick={props.logout} content={'Logout'} />
            </Link>
          )}
        </Menu.Menu>
      </Menu>
    </>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.login.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logout())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
