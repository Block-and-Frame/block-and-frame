import React, { Component } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

class UserEventListItem extends Component {
  render() {
    const dateTime = moment(this.props.date)
    .set({
      hour: this.props.time.split(':')[0],
      minute: this.props.time.split(':')[1],
    })
    .add(1, 'day'); // not sure why a day has to be added
    
    let status = this.props.isHost ? 'host' : 'attend';
    status = moment() > dateTime ? `I ${status}ed:` : `I'm going to ${status.toLowerCase()}:`;
    
    return (
      <div className="item">
        <div className="content">
        <div className="ui medium header">
          {status} 
        </div>
          <Link className="ui medium header" to={`/${this.props.id}`}>
            {this.props.name}
          </Link>
          <div>{dateTime.fromNow()}</div>
          <div>{this.props.location}</div>
        </div>
      </div>
    );
  }
}

export default UserEventListItem;
