import React from 'react';

const Comment = (props) => {
  return (
    <div className="comment">
      <div className="content">
        <a className="author">{props.username}</a>
        <div className="metadata">
          <span className="date">{props.timeCreated}</span>
        </div>
        <div className="text">
          {props.text}
        </div>
      </div>
    </div>
  );
};

module.exports = Comment;
