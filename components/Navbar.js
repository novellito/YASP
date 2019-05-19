import { Image, Menu } from 'semantic-ui-react';
import loginStatus from '../hoc/LoginStatusHoc';
import Link from 'next/link';

export const Navbar = props => {
  return (
    <>
      <Menu inverted data-testid="navbar">
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

export default loginStatus(Navbar);
