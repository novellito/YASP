import { render, cleanup } from 'react-testing-library';
import { Navbar } from '../components/Navbar';

describe('Navbar suite', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should render the navbar with the login and register buttons when logged out', () => {
    const { getByText } = render(<Navbar isLoggedIn={false} />);
    const login = getByText('Login');
    const register = getByText('Register');

    expect(login).toBeTruthy();
    expect(register).toBeTruthy();
  });

  it('Should render the navbar with the logout button when logged in', () => {
    const { getByText } = render(<Navbar isLoggedIn={true} />);
    const logout = getByText('Logout');

    expect(logout).toBeTruthy();
  });

  it('Should should match the snapshot when logged in', () => {
    const elem = render(<Navbar isLoggedIn={true} />);

    expect(elem).toMatchSnapshot();
  });
});
