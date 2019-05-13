import Forms from '../components/Forms';
import FormCard from '../components/FormCard';
import authenticate from '../hoc/AuthHoc';

const Register = props => {
  return <FormCard title="Register" type={<Forms register />} />;
};

export default authenticate(Register, true);
