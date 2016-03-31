import React from 'react';
import { GoogleMapLoader, GoogleMap, Marker } from 'react-google-maps';

const UniqueMapView = (props) => {
  return (
    <div>
      <GoogleMapLoader
        containerElement={
          <div
            {...props}
            style={{
              height: '350px',
              width: '100%',
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            defaultZoom={13}
            center={props.center}
            options={{ disableDefaultUI: true }}
          >
            {props.markers.map((marker) => {
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
};

module.exports = UniqueMapView;
