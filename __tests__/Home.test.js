import { render, cleanup } from 'react-testing-library';
import { Home, refetchToken } from '../pages/Home';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);
const mockUser = {
  token: '123',
  refreshToken: '134343',
  id: '777',
  email: 'foobar@test.com',
  username: 'foobar'
};

mock.onGet('/api/user/profile').reply(404);

mock.onPost('/api/token').reply(200, {
  token: '123',
  refreshToken: '456'
});

describe('Home page suite', () => {
  let props;
  beforeEach(() => {
    props = {
      username: 'bob',
      email: 'bob@test.com',
      userId: '123'
    };
  });

  afterEach(() => {
    cleanup();
  });

  it('Should should match the Home page snapshot', () => {
    const elem = render(<Home />);

    expect(elem).toMatchSnapshot();
  });

  it('Should show the users information', () => {
    const { container } = render(<Home {...props} />);
    const [email, id] = container.getElementsByTagName('p');
    const [username] = container.getElementsByTagName('h1');

    expect(username.innerHTML).toContain(props.username);
    expect(email.innerHTML).toContain(props.email);
    expect(id.innerHTML).toContain(props.userId);
  });

  it('should return a valid token when the info button is clicked', async () => {
    await refetchToken('foobar');

    expect(localStorage.length).toEqual(2);
    expect(localStorage.getItem('jwt')).toEqual('123');
    expect(localStorage.getItem('refreshToken')).toEqual('456');
    localStorage.clear();
  });
});
