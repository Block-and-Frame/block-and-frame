import React, { Component } from 'react';
import ToBringList from './ToBringList';
import CreateMapView from './CreateMapView';

class CreateEventForm extends Component {
  render() {
    return (
      <div className="ui container">
        <form
          className="ui form"
          onSubmit={this.props.preventDefaultSubmit}
        >
          <div className="ui very padded raised segments">
            <div className="ui basic segment">
              <div className="inline fields">
                <div className="sixteen wide field">
                  <label>Name of your Spread:</label>
                  <input
                    className="name"
                    placeholder="Give your spread a name!"
                    value={this.props.name}
                    onChange={this.props.editState}
                  />
                </div>
              </div>

            </div>
            <div className="ui basic segment">
              <div className="inline fields">
                <div className="sixteen wide field">
                  <label><i className="icon instagram"></i>Give your spread a unique instagram hashtag:
                  </label>
                  <input
                    className="hashtag"
                    placeholder="e.g.: #spreadOutProspectParkMar31, #KeckParkSpeadMay20"
                    value={this.props.hashtag}
                    onChange={this.props.editState}
                  />
                  <div className="ui right floated raised compact segment">
                    <small><i className="info circle icon"></i>Providing a hashtag will allow all participants to post their instagram photos to the Spread's page</small>
                  </div>
                </div>
              </div>

            </div>


          <div className="map field ui basic segment">
            <label>Select where you're hosting this spread by typing in the location!</label>
            <CreateMapView
              markers={this.props.markers}
              addMarker={this.props.addMarker}
              handleBoundsChanged={this.props.handleBoundsChanged}
              center={this.props.center}
              onPlacesChanged={this.props.onPlacesChanged}
              onLocationChange={this.props.onLocationChange}
              zoom={this.props.zoom}
            />
          </div>

          <div className="fields ui basic segment">
            <div className="field">
              <label>Date:</label>
              <input
                required
                type="date"
                min={this.props.minDate}
                className="date"
                value={this.props.date}
                onChange={this.props.editState}
              />
            </div>
              <div className="field">
                <label>Time:</label>
                <input
                  required
                  type="time"
                  className="time"
                  value={this.props.time}
                  onChange={this.props.editState}
                />
              </div>
            </div>
            <div className="field ui basic segment">
              <label>Description:</label>
              <textarea
                className="description"
                placeholder="What's the spread about? E.g. a picnic, BBQ, potluck. Does it have a theme?"
                value={this.props.description}
                onChange={this.props.editState}
              >
              </textarea>
            </div>

          <div className="inline fields">
            <div className="ui basic segment">
              <button
                className="to-bring-button ui icon button one wide"
                onClick={this.props.onToBringAdd}
              >
                <i className="plus icon"></i>
              </button>
              <button
                className="ui icon button"
                onClick={this.props.onToBringRemove}
              >
                <i className="remove icon"></i>
              </button>
              <strong>What should people bring?</strong>
            </div>
          </div>

          <div className="ui basic segment">
            <ToBringList
              toBring={this.props.toBring}
              onItemChange={this.props.onItemChange}
              onNotesChange={this.props.onNotesChange}
              onBringerChange={this.props.onBringerChange}
              onToBringRemove={this.props.onToBringRemove}
            />
          </div>

          <button
            className="ui button"
            onClick={this.props.onEventSubmit}
          >
            Create the Spread!
          </button>
        </div>
        </form>
      </div>

    );
  }
}

export default CreateEventForm;
