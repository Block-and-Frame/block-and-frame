import React, { Component } from 'react';
import moment from 'moment';
import Event from './UserEventListItem';

// This componet requires a prop events (array)
// The user events can be found response.data.events from GET response object
class UserEventList extends Component {
  render() {
    return (
      <div className="ui relaxed divided list">
        {
          this.props.events.sort((eventA, eventB) => {
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
                isHost={event._pivot_is_creator}
                date={event.date}
                time={event.time}
                eventId={event.id}
                userId={this.props.userId}
                hashtag={event.hashtag}
                contributions={event.toBring.contributions}
              />
            );
          })
        }
      </div>
    );
  }
}

export default UserEventList;
