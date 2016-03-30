import React from 'react';
import JoinEventButton from './JoinEventButton';
import moment from 'moment';

const UniqueEventView = (props) => {
  let button = null;
  if (props.editable) {
    button = (
      <div className="inline fields">
        <button
          className="editButton ui button"
          onClick={props.setEdit}
        >
          Quick edit
        </button>
      </div>
    );
  } else if (props.joinable) {
    button = (
      <JoinEventButton
        eventId={props.eventId} 
        contributions={props.contributions}
        handleJoinEventWithContributions={props.handleJoinEventWithContributions}
      />
    );
  }

  return (
    <div className="ui items">
      <div className="eventName item">
        <div className="ui large header">
          {props.eventName}
        </div>
      </div>

      <div className="ui item">

      </div>
       <div className="eventHashtag item ">
        <div className="ui medium header">
           {props.hashtag}
        <div>
        <i className="instagram small icon"></i>
        <small>Tag your pics to post them here.</small>
        </div>
        </div>
      </div>

      <div className="date item">
        <div className="ui small header">
          <p>{moment(props.date).format('MMM Do YYYY')} at {moment(props.time, ['H:mm']).format('hh:mm A')}</p>
        </div>
      </div>

      <div className="location item"><i>
        {props.location}
      </i></div>

      <div className="description item">
        {props.description}
      </div>

      { button }
    </div>
  );
};

export default UniqueEventView;
