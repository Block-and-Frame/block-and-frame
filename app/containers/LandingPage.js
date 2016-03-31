import React, { Component } from 'react';
import Signin from './Signin';
import Signup from './Signup';
import Instructions from '../components/landing/Instructions';
import SplashImage from '../components/landing/SplashImage';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignin: false,
      showSignup: false,
    };
    this.signinClick = this.signinClick.bind(this);
    this.signupClick = this.signupClick.bind(this);
  }
  componentDidMount() {
    $('.ui.sticky').sticky({
      context: '#stuck',
    });
    $('.ui.modal').modal();
  }
  signinClick() {
    this.setState({ showSignin: !!!this.state.showSignin });
  }
  signupClick() {
    this.setState({ showSignup: !!!this.state.showSignup });
  }
  render() {
    return (
      <div>
        <div className="landing">
          <div className="ui fixed inverted menu">
            <div className="ui container">
              <a href="#" className="header item">
                <img className="logo" src="" />
                SpreadOut
              </a>
              <a onClick={this.signinClick} href="#" className="item">Sign In</a>
              <a onClick={this.signupClick} href="#" className="item" >Sign Up</a>
              <a href="/about" className="item" >About</a>
            </div>
          </div>
          <div className="popup" > 
            {this.state.showSignin ? <Signin /> : null}
            {this.state.showSignup ? <Signup /> : null}
          </div>
        </div>
        <SplashImage />
        <div className="ui main text container">
          <Instructions />
        </div>
      </div>
    );
  }
}

export default LandingPage;
