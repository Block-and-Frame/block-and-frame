import React, { Component } from 'react';
import Signin from './Signin';
import Instructions from '../components/landing/Instructions';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCredentials: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    $('.ui.sticky').sticky({
      context: '#stuck',
    });
    $('.ui.modal').modal();
  }
  handleClick() {
    this.setState({ showCredentials: !!!this.state.showCredentials });
  }
  render() {
    return (
      <div className="ui compact" id="stuck" >
        
        <div style={{ textAlign: 'center', color: 'white' }}>
          <button onClick={this.handleClick} className="ui sticky button" >
            Sign In
          </button>
        </div>
        
        <section style={{ backgroundImage: 'url(https://s3.amazonaws.com/spreadout-img/LandingPage/photo11.jpg)', backgroundPosition: '-1 bottom', backgroundSize: 'cover', height: '50rem', overflow: 'hidden', textAlign: 'center', color: 'white' }} >
          {this.state.showCredentials ? <Signin /> : null}
          <h1 style={{ fontSize: '3.125rem', marginTop: '22rem', marginBottom: '1rem', fontWeight: '300' }} >Introducing Spread Out</h1>
          <h3 style={{ fontSize: '1.563rem', fontWeight: '300' }} >
            Your friendly free app connecting foodies and travelers in communal mealshares</h3>
          <button onClick={this.handleClick} className="ui button">
            Learn More
          </button>
        </section>
        <Instructions />
        <div className="ui divider"></div>
      </div>
    );
  }
}

export default LandingPage;
