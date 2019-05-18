import { render, cleanup } from 'react-testing-library';
import { FormCard } from '../components/FormCard';
describe('Form card suite', () => {
  afterEach(() => {
    cleanup();
  });

  it('Should should match the Form card component snapshot', () => {
    const elem = render(<FormCard />);

    expect(elem).toMatchSnapshot();
  });
});
