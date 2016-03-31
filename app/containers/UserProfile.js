import React, { Component } from 'react';
import userHelpers from '../utils/userHelpers';
import imageHelpers from '../utils/imageHelpers';
import MenuBar from '../components/MenuBar';
import UserInfo from '../components/users/UserInfo';
import UserEventList from '../components/users/UserEventList';
import instaHelpers from '../utils/instaHelpers';
import UserPicContainer from '../components/instagram/UserPicContainer';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      email: '',
      username: '',
      bio: '',
      location: '',
      isTraveling: null,
      avatarId: 0,
      avatarURL: 'https://s3.amazonaws.com/spreadout-img/avatar.png',
      events: [],
      allThisUsersInstaPics: [],
      instagramProfilePicUrl: '',
    };

    this.getAvatar = this.getAvatar.bind(this);
    this.getInstagramPics = this.getInstagramPics.bind(this);
  }

  componentDidMount() {
    userHelpers.getCurrentUserData()
    .then((user) => {
      console.log('user in comp did mount in user profile', user.data);
      this.setState({
        id: user.data.id,
        email: user.data.email,
        username: user.data.username,
        bio: user.data.bio,
        location: user.data.location,
        isTraveling: user.data.is_traveling,
        events: user.data.events,
        avatarId: user.data.avatar_id,
        instagramProfilePicUrl: user.data.instagram_profile_pic,
      });

      this.getAvatar(user);
      this.getInstagramPics(user);
    });    
  }

  getInstagramPics(user) {
    // / get all the users insta pics, to be filtered later to only #spread_out_space
    if (user.data.instagram_token) {
      instaHelpers.getAllThisUsersPics(user.data.instagram_token)
      .then((data) => {
        this.setState({ allThisUsersInstaPics: data.data.data.data });
      })
      .catch((err) => {
        console.log('error', err);
      });
    }
  }

  getAvatar() {
    console.log('STATE', this.state);
    if (this.state.avatarId) {
      imageHelpers.getUserAvatar(this.state.id)
      .then((res) => {
        if (res.data.filepath) {
          // if found, set the state
          this.setState({ avatarURL: res.data.filepath });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    } else if (this.state.instagramProfilePicUrl) {
      this.setState({ avatarURL: this.state.instagramProfilePicUrl });
    }
  }

  render() {
    return (
      <div>
        <MenuBar />
        <br />
        <div className="ui three column stackable grid">
          <div className="sixteen wide column"><br /></div>
          <div className="four wide column">
          <UserInfo
            user={this.state}
            avatarURL={this.state.avatarURL}
          />
          </div>
          <div className="nine wide column">
            <div className="ui centered large header">My Spreads</div>
            <div className="ui segment">
              <UserEventList
                events={this.state.events}
                userId={this.state.id}
              />
            </div>
          </div>

          <div className="two wide column">
          <UserPicContainer
            userPics={this.state.allThisUsersInstaPics}
          />
          </div>
        </div>
      </div>
    );
  }
}

    // {this.state.allThisUsersInstaPics.map((object, index) => {
    //         // here is where can set #tag we want:
    //         if (
    //           object.tags.indexOf('spread_out_space') >= 0 ||
    //           object.tags.indexOf('spreadoutspace') >= 0
    //           ) {
    //           return (
    //             <div className="">
    //               <InstaUserPics
    //                 key={index}
    //                 data={object}
    //               />
    //             </div>
    //           );
    //         }
    //       })}

export default UserProfile;

