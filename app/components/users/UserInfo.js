import React from 'react';

const UserInfo = ({ user, avatarURL, instagramProfilePic }) => {
  return (
    <div>
      <div className="ui card">
        <div className="image">
          <img src={avatarURL || instagramProfilePic || 'https://s3.amazonaws.com/spreadout-img/avatar.png'} />
          
        </div>
        <div className="content">
          <div className="header">
            {user.username || user.email}
          </div>
          <div className="meta">
            <i className="marker icon" />
            {user.location}
          </div>
          <div className="meta">
            <i className="road icon" />
            {
              user.isTraveling ? 'Currently Traveling' : 'Not Traveling'
            }
          </div>
        </div>
      </div>
      <div className="ui card" id="bio">
        <div className="content">
        {user.bio || `${(user.username || user.email)} hasnt filled out thier bio`}
      </div>
      </div>
    </div>
  );
};

export default UserInfo;
