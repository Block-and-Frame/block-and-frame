import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showLink: false,
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSignupSubmit = this.onSignupSubmit.bind(this);
    this.preventDefaultSubmit = this.preventDefaultSubmit.bind(this);
  }

  onUsernameChange(e) {
    this.setState({ email: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onSignupSubmit() {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };

    console.log('Submit user signup here: ', user);

    axios.post('/api/users/', user)
    .then((res) => {
      console.log(res);
      const userId = res.data.id;
      // mocking the usage of JWTs or the like:
      window.localStorage.setItem('id', userId);
    })
    .catch((res) => {
      console.log(res);
    });
    this.setState({ email: '', password: '', showLink: true });
  }

  preventDefaultSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form
          onSubmit={this.preventDefaultSubmit}
        >
          <input
            placeholder="email"
            value={this.state.email}
            onChange={this.onUsernameChange}
          />
          <input
            placeholder="password"
            value={this.state.password}
            onChange={this.onPasswordChange}
          />
          <button
            onClick={this.onSignupSubmit}
          >Sign Up</button>
        </form>
        { this.state.showLink ? <Link to={'/profile'}> You have successfully signed up! Go to your new user profile. </Link> : null }
      </div>
    );
  }
}

export default Signup;
