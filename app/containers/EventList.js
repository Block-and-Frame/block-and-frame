import React from 'react';
import moment from 'moment';
import eventHelpers from '../utils/eventHelpers';
import Event from '../components/events/EventListItem';
import MenuBar from '../components/MenuBar';
import SearchBar from '../components/SearchBar';


class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filtered: [],
    };

    this.updateFiltered = this.updateFiltered.bind(this);
  }

  // TODO: factor out request into eventHelpers
  componentDidMount() {
    eventHelpers.getAllEvents()
    .then((response) => {
      this.setState({
        data: response.data,
        filtered: response.data,
      });
    });
  }

  updateFiltered(filtered) {
    this.setState({
      filtered,
    });
  }

  render() {
    const eventNodes = this.state.filtered.sort((eventA, eventB) => {
      eventA.dateTime = moment(eventA.date)
      .set({
        hour: eventA.time.split(':')[0],
        minute: eventA.time.split(':')[1],
      })
      .add(1, 'day'); // not sure why a day has to be added
      eventB.dateTime = moment(eventB.date)
      .set({
        hour: eventB.time.split(':')[0],
        minute: eventB.time.split(':')[1],
      })
      .add(1, 'day'); // not sure why a day has to be added

      if (eventA.dateTime > eventB.dateTime) {
        return -1;
      } else if (eventA.dateTime < eventB.dateTime) {
        return 1;
      }
      return 0;
    }).map((event) => {
      return (
        <Event
          key={event.id}
          name={event.name}
          location={event.location}
          description={event.description}
          date={event.date}
          time={event.time}
          id={event.id}
          creator_name={event.users[0] ? event.users[0].username : 'Anonymous' }
          creator_email={event.users[0] ? event.users[0].instagram_username : ''}
        />
      );
    });
    return (
      <div>
        <MenuBar />
        <br />
        <div className="ui container">
          <h1 className="ui dividing header">Local Spreads</h1>
          <SearchBar
            items={this.state.data}
            updateFiltered={this.updateFiltered}
          />
        </div>
        <div className="ui segment">
          {eventNodes.length === 0 ? 'No events found :(' : eventNodes}
        </div>
      </div>
    );
  }
}

export default EventList;
