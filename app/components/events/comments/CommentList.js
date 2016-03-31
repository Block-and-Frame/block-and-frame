import React from 'react';
import Comment from './CommentItem';
import moment from 'moment';

const CommentList = (props) => {
  return (
    <div className="ui segment">
      <div className="ui comments">
        <h3 className="ui dividing header">Comments</h3>
        {
          props.commentData.map((comment) => {
            return (
              <Comment
                username={comment.username}
                timeCreated={moment(comment.timeCreated).calendar()}
                text={comment.text}
              />
            );
          })
        }
        <form 
          className="ui reply form" 
          onSubmit={props.preventDefaultSubmit}
        >
          <div className="field">
            <label></label>
            <textarea
              rows="2"
              value={props.reply}
              onChange={props.handleReplyChange}
            ></textarea>
          </div>
          <div 
            className="ui labeled submit icon button"
            onClick={props.handleSubmit}
          >
            <i className="icon edit"></i> Add Reply
          </div>
        </form>

      </div>
    </div>
  );
};

module.exports = CommentList;
