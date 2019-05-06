import axios from 'axios';

export default class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        '/api/local/signup',

        {
          email: this.state.username,
          password: this.state.password
        }
      );
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <div>
        Username: {/* <form action="">

        </form> */}
        <input
          type="text"
          name="username"
          onChange={e => this.handleInputChange(e)}
          value={this.state.username}
        />
        Password:{' '}
        <input
          type="text"
          name="password"
          onChange={e => this.handleInputChange(e)}
          value={this.state.password}
        />
        <button onClick={this.handleSubmit}>Submit</button>
        <br />
        Username : {this.state.username}
        <br />
        Password : {this.state.password}
      </div>
    );
  }
}
