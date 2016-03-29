import React, { Component } from 'react';
import AboutSpreadOut from '../components/about/AboutSpreadOut';
import AboutUs from '../components/about/AboutUs';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div className="about">
        <div className="ui container">
          <AboutSpreadOut />
        </div>
        <AboutUs />
      </div>
    );
  }
}

export default About;
