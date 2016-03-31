import React from 'react';

const InstaButton = () => {
  return (
    <button
      className="ui instagram button toggle"
    >
      <i className="instagram icon"></i>
      <a href="/auth/instagram" className="instabutton">Login with Instagram</a>
    </button>
  );
};

export default InstaButton;
