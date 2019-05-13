import Forms from '../components/Forms';
import FormCard from '../components/FormCard';
import Socials from '../components/SocialLogins';

const Login = props => {
  const openPopup = () => {
    // const { provider, socket } = this.props;
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    const url = `http://localhost:5000/api/facebook/login`;

    return window.open(
      url,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
      scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
      height=${height}, top=${top}, left=${left}`
    );
  };
  return (
    <FormCard
      title="Login"
      type={
        <>
          <Forms />
          <Socials />
        </>
      }
    />
  );
};

export default Login;
