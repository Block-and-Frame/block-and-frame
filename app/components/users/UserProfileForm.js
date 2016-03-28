import React, { Component } from 'react';
import Geosuggest from 'react-geosuggest';

class UserProfileForm extends Component {
  constructor(props) {
    super(props);

    this._onBlur = this._onBlur.bind(this);
    this._onLocationSelect = this._onLocationSelect.bind(this);
  }

  _onBlur() {
    this.refs.geosuggest.setState({
      suggests: [],
    });
  }

  _onLocationSelect(location) {
    this._onBlur();
    this.props.onLocationSelect(location);
  }

  render() {
    return (
      <div>
        <form className="ui form"
          onSubmit={this.props.preventDefaultSubmit}
        >

          <div className="field">
            <label>Your email:</label>
            <input type="email"
              value={this.props.email}
              onChange={this.props.onEmailChange}
            />
          </div>

          <div className="field">
            <label>Your name:</label>
            <input
              value={this.props.username}
              onChange={this.props.onNameChange}
            />
          </div>

          <div className="field">
            <label>Your location:</label>
            <Geosuggest
              ref="geosuggest"
              initialValue={this.props.location}
              onBlur={this._onBlur}
              onChange={this.props.onLocationChange}
              onSuggestSelect={this._onLocationSelect}
            />
          </div>

          <div className="field">
            <label>I am currently traveling</label>
            <input
              type="checkbox"
              checked={this.props.isTraveling}
              onChange={this.props.onTravelingChange}
            />
          </div>

          <div className="field">
            <label>Your Bio:</label>
            <textarea
              value={this.props.bio}
              onChange={this.props.onBioChange}
              placeholder="Say a few words about yourself, and your relationship to food and travel"
            />
          </div>

            <button
              className="ui button"
              onClick={this.props.onProfileSubmit}
            >
              <i className="icon save"></i>
              Save Profile
            </button>


          <button
            className="ui basic button"
            onClick={this.props.onDeleteUser}
          >
            Delete Account
          </button>

        </form>
      </div>
    );
  }
}

export default UserProfileForm;
