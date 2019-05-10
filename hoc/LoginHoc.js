import { connect } from 'react-redux';
import axios from 'axios';
import * as actionCreators from '../store/actions/actionCreators';

export default function(ChildComponent) {
  class Authenticate extends Component {
    componentDidMount() {
      this.checkLoginStatus();
    }

    // Check the login status of the user - there are 3 cases
    // 1: The user visits /login for the first time/ has just logged out. In which case
    // onLogout is triggered
    // 2: The user is not authenticated so check if there is
    // a valid jwt and do appropriate logic
    checkLoginStatus = async () => {
      const jwt = localStorage.getItem('jwt');
      const { isAuthenticated, history } = this.props;
      if (
        localStorage.length === 0 &&
        this.props.location.pathname === '/login'
      ) {
        this.props.onLogout();
      } else if (!isAuthenticated) {
        if (!jwt) {
          history.replace('/login');
          return;
        }
        const headers = {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        };

        try {
          const { data } = await axios.post(
            'http://localhost:5000/api/login/authorize',
            null,
            {
              headers
            }
          );
          this.props.setUser(localStorage.getItem('uid'), data.username);
        } catch (err) {
          // the token is invalid
          history.replace('/login');
          this.props.onLogout();
        }
      }
    };

    render() {
      // render login only if there is no local localStorage
      return (
        <div>
          {this.props.isAuthenticated ||
          (this.props.location.pathname === '/login' &&
            localStorage.length === 0) ? (
            <ChildComponent {...this.props} />
          ) : null}
        </div>
      );
    }
  }
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.login.isLoggedIn
    };
  };

  const mapDispatchToProps = dispatch => ({
    setUser: (userId, user) => dispatch(actionCreators.setUser(userId, user)),
    onLogout: () => dispatch(actionCreators.logout())
  });

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}
