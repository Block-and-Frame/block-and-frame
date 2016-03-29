import React from 'react';

// TODO: style better / make into a flippable card ? 
const BringerView = (props) => {
  return (
    <div className="extra content">
      <b>Will be brought to you by: </b>          
        <span className="bringer-line-item">
          <a>{props.info.username || null}</a><br />
             {props.info.isTraveling ? 'A traveler' : 'A local'}<br />
             {props.info.userLocation || null}<br />

             { /* if instagram username exists render it TODO: make it a real link */
              props.info.instagramUsername && 
              <a><i className="instagram icon"></i>
              {props.info.instagramUsername}</a>
            }
        </span>
      <a className="right floated" href="instagram.com">
        <img className="ui avatar tiny image" src={ props.info.instagramPic || null} />
      </a> 
  </div>
  );
};

export default BringerView;

