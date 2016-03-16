import React, { Component } from 'react';
import axios from 'axios';
import MenuBar from '../components/MenuBar';

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

    // TODO: replace hardcoded userId in url depending on auth
    axios.post('/api/events/1', event)
    .then((res) => {
      console.log(res);
    })
    .catch((res) => {
      console.log(res);
    });

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
        <MenuBar />
        <div className="ui container">
          <h1 className="ui dividing header">Create an Event!</h1>
          <form
            className="ui form"
            onSubmit={this.preventDefaultSubmit}
          >
            <div className="field">
              <label>Event Name: </label>
              <input
                value={this.state.name}
                onChange={this.onNameChange}
              />
            </div>
            <div className="field"> 
              <label>Location: </label>
              <input
                value={this.state.location}
                onChange={this.onLocationChange}
              />
            </div>
            <div className="field">
              <label>Description</label>
              <textarea
                placeholder="Describe your event"
                value={this.state.description}
                onChange={this.onDescriptionChange} 
              >
              </textarea>
            </div>
            <button
              className="ui button"
              onClick={this.onEventSubmit}
            >Create!
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
