import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSigninSubmit = this.onSigninSubmit.bind(this);
    this.preventDefaultSubmit = this.preventDefaultSubmit.bind(this);
  }

  onUsernameChange(e) {
    this.setState({ email: e.target.value });
  }

  onPasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  onSigninSubmit() {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };


    // TODO: fix login after auth route exists
    console.log('Submit user login here: ', user);

    axios.post('/auth/signin/', user)
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });

    // clear forms
    this.setState({ email: '', password: '' });
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
          <label>email: </label>
          <input
            value={this.state.email}
            onChange={this.onUsernameChange}
          /><br />
          <label>Password: </label>
          <input
            value={this.state.password}
            onChange={this.onPasswordChange}
          /><br />
          <button
            onClick={this.onSigninSubmit}
          >Sign In</button>
        </form>
      </div>
    );
  }
}

export default Signin;
