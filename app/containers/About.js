import React, { Component } from 'react';
import AboutSpreadOut from '../components/about/AboutSpreadOut';
import AboutUs from '../components/about/AboutUs';
import Menubar from '../components/Menubar';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Menubar />
        <div className="about">
          <div className="ui container">
            <AboutSpreadOut />
          </div>
          <AboutUs />
        </div>
      </div>
    );
  }
}

export default About;
