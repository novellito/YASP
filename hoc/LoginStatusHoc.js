import { connect } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators';

export default function(ChildComponent) {
  const Authenticate = props => {
    return <ChildComponent {...props} />;
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

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}
