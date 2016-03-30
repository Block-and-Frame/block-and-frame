import React, { Component } from 'react';
import update from 'react-addons-update';
import eventHelpers from '../utils/eventHelpers';
import MenuBar from '../components/MenuBar';
import CreateEventForm from '../components/events/CreateEventForm';
import moment from 'moment';

const now = moment();

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      hashtag: '',
      description: '',
      toBring: [
        {
          index: 0,
          item: '',
          notes: '',
          bringer: null,
        },
        {
          index: 1,
          item: '',
          notes: '',
          bringer: null,
        },
        {
          index: 2,
          item: '',
          notes: '',
          bringer: null,
        },
      ],
      coordinates: '',
      date: now.format('YYYY-MM-DD'),
      time: now.format('HH:mm'),
      markers: [],
      bounds: null,
      center: { lat: 39.0038657, lng: -96.5672834 },
      missingItems: [],
      zoom: 9,
    };

    this.editState = this.editState.bind(this);
    this.onEventSubmit = this.onEventSubmit.bind(this);
    this.onToBringAdd = this.onToBringAdd.bind(this);
    this.onToBringRemove = this.onToBringRemove.bind(this);
    this.onItemChange = this.onItemChange.bind(this);
    this.onNotesChange = this.onNotesChange.bind(this);
    this.onBringerChange = this.onBringerChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.preventDefaultSubmit = this.preventDefaultSubmit.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.deleteMarker = this.deleteMarker.bind(this);
    this.handleBoundsChanged = this.handleBoundsChanged.bind(this);
    this.setCenter = this.setCenter.bind(this);
    this.getUserLocation = this.getUserLocation.bind(this);
  }

  componentDidMount() {
    this.getUserLocation();
  }

  onEventSubmit() {
    // filter blank contributions and fix indexing
    const contributions = this.state.toBring.filter((contribution) => {
      if (contribution.item) {
        return true;
      }
      return false;
    }).map((contribution, index) => {
      contribution.index = index;
      return contribution;
    });

    this.setState({ missingItems: [] });
    // setTimeout because setting the state above is asyncronous
    setTimeout(() => {
      for (const key in this.state) {
        if (key === 'name' || key === 'description' || key === 'coordinates') {
          if (this.state[key] === '') {
            const newState = this.state.missingItems;
            newState.push(key);
            this.setState({ missingItems: newState });
          }
        }
      }
    }, 0);

    setTimeout(() => {
      // return if any items are missing
      if (this.state.missingItems.length) {
        return;
      }
      eventHelpers.createEvent({
        name: this.state.name,
        location: this.state.location,
        description: this.state.description,
        date: this.state.date,
        time: this.state.time,
        coordinates: this.state.coordinates,
        markers: this.state.markers,
        toBring: contributions,
        hashtag: this.state.hashtag,
      }, this);

    // reset forms
      this.setState({
        name: '',
        location: '',
        description: '',
        toBring: [],
        date: '',
        time: '',
        hashtag: '',
      });
    }, 500);
  }

  onToBringAdd(e) {
    e.preventDefault();
    this.setState({
      toBring: this.state.toBring.concat([{
        index: this.state.toBring.length,
        item: '',
        notes: '',
        bringer: null,
      }]),
    });
  }

  onToBringRemove(e) {
    e.preventDefault();
    const updated = this.state.toBring.slice();
    updated.pop();
    this.setState({
      toBring: updated.map((contribution, index) => {
        contribution.index = index;
        return contribution;
      }),
    });
  }

  onItemChange(e, index) {
    const updated = this.state.toBring.slice();
    updated[index].item = e.target.value;
    this.setState({
      toBring: updated,
    });
  }

  onNotesChange(e, index) {
    const updated = this.state.toBring.slice();
    updated[index].notes = e.target.value;
    this.setState({
      toBring: updated,
    });
  }

  onLocationChange(address) {
    this.setState({ location: address });
  }

  onBringerChange(e, index) {
    const updated = this.state.toBring.slice();
    if (e.target.checked) {
      updated[index].bringer = window.localStorage.getItem('id');
    } else {
      updated[index].bringer = null;
    }
    this.setState({
      toBring: updated,
    });
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(position => {
      const center = {};
      center.lat = position.coords.latitude;
      center.lng = position.coords.longitude;
      this.setState({ center });
    });
  }

  setCenter() {
    const location = {};
    const coordinates = this.state.coordinates;
    location.lat = Number(coordinates.split(',').shift());
    location.lng = Number(coordinates.split(',').pop());
    this.setState({ center: location });
  }

  editState(e) {
    this.setState({ [e.target.className]: e.target.value });
  }

  handleBoundsChanged() {
    this.setState({
      bounds: this.refs.map.getBounds(),
      center: this.refs.map.getCenter(),
    });
  }

  handlePlacesChange() {
    const places = this.refs.searchBox.getPlaces();
    let { markers } = this.state;
    markers = update(markers, {
      $push: [
        {
          position: places.geometry.location,
        },
      ],
    });

    this.setState({ markers });
  }

  addMarker(coordinates) {
    const zoom = 13;
    const location = {};
    location.lat = Number(coordinates.split(',').shift());
    location.lng = Number(coordinates.split(',').pop());
    if (this.state.markers.length > 0) {
      this.deleteMarker();
    }
    let markers = this.state.markers;
    markers = update(markers, {
      $push: [
        {
          position: location,
        },
      ],
    });
    this.setState({ coordinates, markers, zoom });
    this.setCenter();
  }

  deleteMarker() {
    const markers = [];
    this.setState({ markers });
  }

  preventDefaultSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <MenuBar />
        <br />
        <div className="ui container">
          <h1 className="ui dividing header">Host a Spread!</h1>
          <div>
            {
              this.state.missingItems.length === 0 ? null :
              <div className="ui negative message">
                Please fill out the following forms:<br />
                  {
                    this.state.missingItems.map((item) => {
                      if (item === 'coordinates') {
                        item = 'location';
                      }
                      return <b>{item}<br /></b>;
                    })
                  }
              </div>
            }
          </div>
        </div>
        <CreateEventForm
          name={this.state.name}
          location={this.state.location}
          hashtag={this.state.hashtag}
          date={this.state.date}
          time={this.state.time}
          description={this.state.description}
          toBring={this.state.toBring}
          markers={this.state.markers}
          missingItems={this.state.missingItems}
          minDate={now.format('YYYY-MM-DD')}
          bounds={this.state.bounds}
          center={this.state.center}
          zoom={this.state.zoom}
          editState={this.editState}
          onEventSubmit={this.onEventSubmit}
          onToBringAdd={this.onToBringAdd}
          onToBringRemove={this.onToBringRemove}
          onItemChange={this.onItemChange}
          onNotesChange={this.onNotesChange}
          onLocationChange={this.onLocationChange}
          onBringerChange={this.onBringerChange}
          preventDefaultSubmit={this.preventDefaultSubmit}
          addMarker={this.addMarker}
          deleteMarker={this.deleteMarker}
          handleBoundsChanged={this.handleBoundsChanged}
          onPlacesChanged={this.handlePlacesChange}
        />
      </div>
    );
  }
}

CreateEvent.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default CreateEvent;
