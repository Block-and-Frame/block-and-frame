import React from 'react';
import { Link } from 'react-router';
import authHelpers from '../utils/authHelpers';

const MenuBar = () => {
  return (
  <div className="ui attached stackable menu">

    <Link
      className="item"
      to={'/'}
    >
      <i className="big world icon" />
      <b>
        Spread Out
      </b>
    </Link>
    <Link
      className="item"
      to={'/events'}
    >
        <i className="users icon" />
        View Spreads
    </Link>
    <Link
      className="item"
      to={'/eventcreate'}
    >
      <i className="spoon icon" />
      Host A Spread
    </Link>
    <div className="ui simple dropdown right vertical item">
        My Account
      <i className="dropdown icon" />
      <div className="menu">
        <Link
          className="item"
          to={'/profile'}
        >
          <i className="food icon" />
          Dashboard
        </Link>
        <Link
          className="item"
          to={'/editprofile'}
        >
          <i className="edit icon" />
          Edit Profile
        </Link>
        <a className="item"><i className="mail icon" /> Messages</a>
        <a className="item"><i className="settings icon" /> Account Settings</a>
        <Link
          className="item"
          to={'/signin'}
          onClick={authHelpers.logout}
        >
          <i className="sign out icon" />
           Log Out
        </Link>
      </div>
  </div>
</div>
  );
};

export default MenuBar;
