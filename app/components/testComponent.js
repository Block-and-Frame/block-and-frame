import React, { Component } from 'react';

class TestComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'Testing!',
    };
  }

  render() {
    return (
      <div>
        <h1>Hello World!</h1>
        <p>{this.state.test}</p>
      </div>
    );
  }
}

module.exports = TestComponent;
