import React, { Component } from 'react';
import { GoogleMapLoader, GoogleMap, Marker, SearchBox } from 'react-google-maps';

class CreateMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: '',
    };
    this.handlePlacesChanged = this.handlePlacesChanged.bind(this);
  }

  handlePlacesChanged() {
    const places = this.refs.searchBox.getPlaces();
    const address = places[0].formatted_address;
    const lat = places[0].geometry.location.lat().toString();
    const lng = places[0].geometry.location.lng().toString();
    const coordinates = lat.concat(',').concat(lng);
    this.props.addMarker(coordinates);
    this.props.onLocationChange(address);
  }

  render() {
    return (
      <div>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props}
              style={{
                height: '250px',
                width: '500px',
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              zoom={this.props.zoom}
              center={this.props.center}
              onClick={this.props.addMarker.bind(this)}
            >
              <SearchBox
                className="searchBox"
                ref="searchBox"
                bounds={this.props.bounds}
                controlPosition={google.maps.ControlPosition.TOP_LEFT}
                placeholder="Enter spread location (e.g. a park)"
                onPlacesChanged={this.handlePlacesChanged.bind(this)}
              />
              {this.props.markers.map((marker) => {
                return (
                  <Marker
                    {...marker}
                  />
                );
              })}
            </GoogleMap>
          }
        />

      </div>
    );
  }
}

export default CreateMapView;
