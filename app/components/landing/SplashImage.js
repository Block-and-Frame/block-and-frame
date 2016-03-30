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
        <img id="p1" src="https://s3.amazonaws.com/spreadout-img/LandingPage/img1.png" />
        <img id="t1" src="https://s3.amazonaws.com/spreadout-img/LandingPage/t1.png" />
        <img id="t2" src="https://s3.amazonaws.com/spreadout-img/LandingPage/t3.png" />
      </div>
    );
  }
}

export default SplashImage;
