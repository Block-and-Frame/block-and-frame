import React from 'react';
import userHelpers from '../utils/userHelpers';
// import { Link } from 'react-router';
import MenuBar from '../components/MenuBar';
import UserProfileForm from '../components/UserProfileForm';
import ImageUploadButton from '../components/ImageUploadButton';

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
      // instagram
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onLocationSelect = this.onLocationSelect.bind(this);
    this.onBioChange = this.onBioChange.bind(this);
    this.onTravelingChange = this.onTravelingChange.bind(this);
    this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
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
    })
    .catch((err) => {
      console.log(err);
    });
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
      <div className="ui container">
        <MenuBar />
        <h1 className="ui dividing header">
          Your Profile:
        </h1>
        <div className="ui raised very padded text container segment">
          <div className="ui container">
            <ImageUploadButton />
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
              google={this.state.google}
              // TODO instagram={this.state.instagram}
              // TODO onInstagramChange={this.onInstagramChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;