import React, { Component } from 'react';
// import eventHelpers from '../../../utils/eventHelpers';

class ContributeButton extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    e.preventDefault();
    this.props.onClick(e);
  }

  render() {
    return (
      <button
        className="ui button"
        onClick={this.onClick}
      >
        Contribute!
      </button>
    );
  }
}

export default ContributeButton;
