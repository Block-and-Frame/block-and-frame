import React from 'react';
import UserPic from './UserPicComponent';

const tag1 = 'spreadoutspace';
const tag2 = 'spreadout';

const UserPicContainer = (props) => {
  console.log(props);
  return (
    <div>
      <p>
        <i className="icon small instagram"></i>Tag your grams with #{tag1}, #{tag2} <i className="icon small arrow circle down"></i>
      </p>
      {props.userPics.map((pic, index) => {
        if (
          pic.tags &&
          /*  here is where can set #tag we want users to show on profile: */
          pic.tags.indexOf(tag1) >= 0 ||
          pic.tags.indexOf(tag2) >= 0) {
          return (
            <UserPic
              key={index}
              id={index}
              pic={pic}
            />
          );
        }
      }
    )}
    </div>
  );
};

export default UserPicContainer;
