import React, { Component } from 'react';
// import axios from 'axios';

class CreateEvent extends Component {
  constructor(props) {
    super(props);

    // TODO: add coordinates
    this.state = {
      name: '',
      location: '',
      description: '',
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onEventSubmit = this.onEventSubmit.bind(this);
    this.preventDefaultSubmit = this.preventDefaultSubmit.bind(this);
  }

  onNameChange(e) {
    this.setState({ name: e.target.value });
  }

  onLocationChange(e) {
    this.setState({ location: e.target.value });
  }

  onDescriptionChange(e) {
    this.setState({ description: e.target.value });
  }

  onEventSubmit() {
    const event = {
      name: this.state.name,
      location: this.state.location,
      description: this.state.description,
    };
    // TODO: use axios to send event ot back end and reroute?

    console.log(event);
    this.setState({
      name: '',
      location: '',
      description: '',
    });
  }

  preventDefaultSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        CreateEvent hhere
        <form
          onSubmit={this.preventDefaultSubmit}
        >
          <label>Event Name: </label>
          <input
            value={this.state.name}
            onChange={this.onNameChange}
          /><br />
          <label>Location: </label>
          <input
            value={this.state.location}
            onChange={this.onLocationChange}
          /><br />
          <label>Description: </label>
          <input
            value={this.state.description}
            onChange={this.onDescriptionChange}
          /><br />
          <button
            onClick={this.onEventSubmit}
          >Create!</button>
        </form>
      </div>
    );
  }
}

export default CreateEvent;
