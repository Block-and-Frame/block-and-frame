import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import UniqueMapView from '../components/events/UniqueMapView';

class Event extends React.Component {
  render() {
    const dateTime = moment(this.props.date)
    .set({
      hour: this.props.time.split(':')[0],
      minute: this.props.time.split(':')[1],
    })
    .add(1, 'day'); // not sure why a day has to be added
    
    return (
      <div className="ui large list">
        <UniqueMapView />
        <div className="item">
          <div className="ui padded text container raised segment">
            <Link to={`/${this.props.id}`} className="header">{this.props.name}</Link>
            <div className="location">{this.props.location}</div>
            <div className="host">
              <div>Hosted by: {this.props.creator_name || this.props.creator_email}</div>
              <div>{dateTime.format('MMMM Do YYYY, h:mm:ss a')}</div>
            </div>
            <div className="description">
              {this.props.description}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Event;
