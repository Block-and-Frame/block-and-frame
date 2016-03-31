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
            const dateTimeA = moment(`${eventA.date} ${eventA.time}`);
            const dateTimeB = moment(`${eventB.date} ${eventB.time}`);

            if (dateTimeA > dateTimeB) {
              return -1;
            } else if (dateTimeA < dateTimeB) {
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
