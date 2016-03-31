import React, { Component } from 'react';

class SplashImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="splash">
        <div className="splashBlurb">
          <h1 className="ui header">Introducing Spread Out</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit voluptate molestias maxime, iusto dolore voluptatum. Officiis consequuntur iusto saepe doloremque velit architecto, cupiditate, molestias, consequatur iste odit rem illum repellendus.</p>
        </div>
        <img id="p1" src="https://s3.amazonaws.com/spreadout-img/LandingPage/img1.png" />
        <img id="t1" src="https://s3.amazonaws.com/spreadout-img/LandingPage/t1.png" />
      </div>
    );
  }
}

export default SplashImage;
