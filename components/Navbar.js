import {
  Container,
  Icon,
  Image,
  Menu,
  Sidebar,
  Responsive
} from 'semantic-ui-react';
const rightItems = [
  { as: 'a', content: 'Login', key: 'login' },
  { as: 'a', content: 'Register', key: 'register' }
];
import Link from 'next/link';

const Navbar = props => {
  return (
    <>
      <Menu inverted>
        <Menu.Item>
          <Image size="mini" src="https://react.semantic-ui.com/logo.png" />
        </Menu.Item>

        <Menu.Menu position="right">
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
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default Navbar;
