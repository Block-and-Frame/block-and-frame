import React from 'react';

const InstaUserPics = ({ data }) => {
  return (
    <div>
      <img src={data.images.thumbnail.url} alt="" className="ui circular tiny image" /> 
      <h5 className="ui header">{data.caption.text}</h5> 
    </div>
  );
};

export default InstaUserPics;

// <div className="six wide column">
//       <div className="ui card">con
//         <div className="image">
//           <img src="http://www.geekstogo.com/forum/public/style_images/shift/profile/xdefault_large.png.pagespeed.ic.-RW8oDYs8z.png" />
//         </div>
//         <div className="content">
//           <div className="header">
//             {user.username || user.email}
//           </div>
//           <div className="meta">
//             <i className="marker icon" />
//             {user.location}
//           </div>
//           <div className="meta">
//             <i className="road icon" />
//             {
//               user.isTraveling ? 'Currently Traveling' : 'Not Traveling'
//             }
//           </div>
//         </div>
//       </div>
//       <div className="ui card">
//         <div className="content">
//         {user.bio || `${(user.username || user.email)} hasnt filled out thier bio`}
//         </div>
//       </div>
      
//     </div>

