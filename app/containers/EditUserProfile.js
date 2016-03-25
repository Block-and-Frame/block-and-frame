import React from 'react';
import userHelpers from '../utils/userHelpers';
import MenuBar from '../components/MenuBar';
import UserProfileForm from '../components/users/UserProfileForm';
import ImageUploadButton from '../components/users/ImageUploadButton';
import EditSuccess from '../components/users/EditSuccess';

// TODO: Confirm profile deletion, msg about success, redirect user to home.

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      bio: '',
      location: '',
      isTraveling: null,
      sucess: false,
      // instagram
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onLocationSelect = this.onLocationSelect.bind(this);
    this.onBioChange = this.onBioChange.bind(this);
    this.onTravelingChange = this.onTravelingChange.bind(this);
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
    this.handleImageSubmit = this.handleImageSubmit.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.preventDefaultSubmit = this.preventDefaultSubmit.bind(this);
    // this.onInstagramChange = this.onBioChange.bind(this);
  }

  componentDidMount() {
    userHelpers.getCurrentUserData()
    .then((user) => {
      this.setState({
        email: user.data.email,
        username: user.data.username,
        bio: user.data.bio,
        location: user.data.location,
        isTraveling: user.data.is_traveling,
      });
    });
  }

  onNameChange(e) {
    this.setState({ username: e.target.value });
  }

  onEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  onLocationChange(value) {
    this.setState({ location: value });
  }

  onLocationSelect(location) {
    this.setState({ location: location.label });
  }

  onBioChange(e) {
    this.setState({ bio: e.target.value });
  }

  onTravelingChange(e) {
    this.setState({ isTraveling: e.target.checked });
  }

  // onInstagramChange(e) {
  //   this.setState({ instagram: e.target.value });
  // }

  handleProfileSubmit() {
    userHelpers.updateUser(this.state)
    .then((user) => {
      console.log('user after PUT', user);
      this.setState({ success: true });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleImageSubmit() {

  }

  handleDeleteUser() {
    userHelpers.deleteUser().
    then((info) => {
      console.log('info from server: ', info);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  preventDefaultSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <MenuBar />
        <div className="ui container">
          <h1 className="ui dividing header"
            id="editprofileheader"
          >
            Edit Profile:
          </h1>
        </div>
        <div className="ui raised very padded text container segment">
          <div className="ui container">
            <ImageUploadButton
              onImageSubmit={this.handleImageSubmit}
            />
            <UserProfileForm
              username={this.state.username}
              email={this.state.email}
              location={this.state.location}
              bio={this.state.bio}
              isTraveling={this.state.isTraveling}
              onNameChange={this.onNameChange}
              onEmailChange={this.onEmailChange}
              onLocationChange={this.onLocationChange}
              onLocationSelect={this.onLocationSelect}
              onBioChange={this.onBioChange}
              onTravelingChange={this.onTravelingChange}
              onDeleteUser={this.handleDeleteUser}
              onProfileSubmit={this.handleProfileSubmit}
              preventDefaultSubmit={this.preventDefaultSubmit}
              // TODO instagram={this.state.instagram}
              // TODO onInstagramChange={this.onInstagramChange}
            />
            <EditSuccess success={this.state.success} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
