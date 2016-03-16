import React from 'react';
import helpers from '../utils/helpers';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      username: '',
      bio: '',
      city: '',
      country: '',
    };
  } 
  componentDidMount() {
    // Mock token
    const token = window.localStorage.id;
    helpers.getCurrentUserData(token)
    .then((user) => {
      console.log('USER', user);
      const email = user.data.email;
      const username = user.data.username;
      const bio = user.data.bio;
      const city = user.data.city;
      const country = user.data.country;
      // object literal property value shorthand es6 is awesome:
      this.setState({ email, username, bio, city, country });
    });
  }
  render() {
    return (
      <div>
        <div>
          User Profile:
        </div>
        <div>
          Your email: { this.state.email }
        </div>
        { this.state.username ? <p>{ this.state.username }</p> : <p>You haven't set a display name</p> }
        <div>
        { this.state.city ? <p>{ this.state.city }</p> : <p>You haven't set a city</p> }
        </div>
        <div>
        { this.state.country ? <p>{ this.state.country }</p> : <p>You haven't set a country</p> }
        </div>
        <div>
        { this.state.bio ? <p>{ this.state.bio }</p> : <p>You haven't set a bio</p> } 
        </div>
      </div>
    );
  }
}

export default UserProfile;
