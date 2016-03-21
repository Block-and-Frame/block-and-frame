import React from 'react';
import axios from 'axios';
import Event from './Event';
import MenuBar from '../components/MenuBar';
import SearchBar from '../components/SearchBar';

class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios.get('/api/events')
      .then((response) => {
        console.log('EVENLISTDATA', response.data);
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUserInput(event) {
    this.setState({ filterText: event.target.value });
  }

  render() {
    const eventNodes = this.state.data.map((event) => {
      return (
        <Event
          key={event.id}
          name={event.name}
          location={event.location}
          description={event.description}
          id={event.id}
          creator_name={event.users[0].username}
          creator_email={event.users[0].email}
        >
        .
        </Event>
      );
    });
    return (
      <div>
        <MenuBar />
        <br />
        <div className="ui container">
          <h1 className="ui dividing header">Local Spreads</h1>
        </div>
        <div className="ui segment">
          <SearchBar
            filterText={this.state.filterText}
            onUserInput={this.handleUserInput}
          />
          {eventNodes}
        </div>
      </div>
    );
  }

}

export default EventList;
