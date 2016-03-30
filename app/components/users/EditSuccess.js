import React from 'react';
import { Link } from 'react-router';

const EditSuccess = ({ success, duplicateEmail }) => {
  if (success) {
    return (
      <div className="ui success message">
        <div className="ui header">
          Save Successful!
        </div>
        <Link className="small" to={'/profile'} >
          Visit profile.
        </Link>
      </div>
    );
  }
  if (duplicateEmail) {
    return (
      <div className="ui negative message">
        <div className="ui header">
          Email already in use!
        </div>
      </div>
    );
  }
  return (<div></div>);
};

export default EditSuccess;
