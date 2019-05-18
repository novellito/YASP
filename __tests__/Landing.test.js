import { render, cleanup } from 'react-testing-library';
import { Landing } from '../pages/landing';

describe('Landing page suite', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should should match the landing page snapshot', () => {
    const elem = render(<Landing />);

    expect(elem).toMatchSnapshot();
  });
});
