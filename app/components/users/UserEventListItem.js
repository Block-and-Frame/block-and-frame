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
    status = moment() > dateTime ? `${status}ed` : `will ${status}`;
    
    return (
      <div className="item">
        <div className="content">
          <Link className="header" to={`/${this.props.id}`}>
            {status} {this.props.name}
          </Link>
          <div>{dateTime.fromNow()}</div>
          <div>{this.props.location}</div>
        </div>
      </div>
    );
  }
}

export default UserEventListItem;
