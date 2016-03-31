import React from 'react';
import moment from 'moment';
import eventHelpers from '../utils/eventHelpers';
import authHelpers from '../utils/authHelpers';
import Event from '../components/events/EventListItem';
import MenuBar from '../components/MenuBar';
import SearchBar from '../components/SearchBar';


class EventList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filtered: [],
      hashtags: [],
    };

    this.updateFiltered = this.updateFiltered.bind(this);
  }

  componentDidMount() {
    // When signing in with instagram, back end will redirect here with token and id in url
    // Check if user arrived here with token and id and store it to log in
    const { token, userId } = this.props.location.query;
    if (token && userId) {
      authHelpers.storeToken(token, userId);
    }

    eventHelpers.getAllEvents()
    .then((response) => {
      this.setState({
        data: response.data,
        filtered: response.data,
      });
      console.log('data', response.data);
      this.setState({
        hashtags: response.data.map((event) => {
          return event.hashtag;
        }),
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
      const dateTimeA = moment(`${eventA.date} ${eventA.time}`);
      const dateTimeB = moment(`${eventB.date} ${eventB.time}`);

      if (dateTimeA > dateTimeB) {
        return -1;
      } else if (dateTimeA < dateTimeB) {
        return 1;
      }
      return 0;
    }).map((event) => {
      const markers = [];
      const location = {};
      location.lat = Number(event.coordinates.split(',').shift());
      location.lng = Number(event.coordinates.split(',').pop());
      markers.push({ position: location });

      return (
        <Event
          key={event.id}
          name={event.name}
          location={event.location}
          description={event.description}
          hashtag={event.hashtag}
          date={event.date}
          time={event.time}
          id={event.id}
          creatorName={ eventHelpers.findCreator(event.users).username}
          creatorInstaname={eventHelpers.findCreator(event.users).instagram_username }
          creatorInstaPic={eventHelpers.findCreator(event.users).instagram_profile_pic }
          numAttendees={event.users.length}
          markers={markers}
          center={location}
        />
      );
    });
    return (
      <div>
        <MenuBar />
        <div className="ui container">
          <h1 className="ui dividing header">Local Spreads</h1>
          <SearchBar
            items={this.state.data}
            updateFiltered={this.updateFiltered}
          />
        <div className="ui three stackable cards">
          {eventNodes.length === 0 ? 'No events found :(' : eventNodes}
        </div>
      </div>
      </div>
    );
  }
}

export default EventList;
