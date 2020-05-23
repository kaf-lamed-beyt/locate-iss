import React from 'react';
import {
  Map, TileLayer, Marker, Popup,
} from 'react-leaflet';
import ReactDOM from 'react-dom';

// const fetch = require('node-fetch');

const ISS__API = 'http://api.open-notify.org/iss-now.json';


class MapBase extends React.Component {
  constructor() {
    super();

    this.state = {
      latitude: 51.505,
      longitude: -0.09,
      zoom: 13,
    };
  }

  getISSLocation() {
    this.fetch(ISS__API)
      .then((response) => response.json())
      .then((data) => {
        const lat = data.iss_position.latitude;
        const lng = data.iss_position.longitude;
        console.log(
          `The ISS position is currently at latitude and longitude of: ${lat} ${lng}`,
        );
      })
      .catch((err) => {
        console.log('fetching resources from here failed', err);
      });
  }

  render() {
    const { latitude, longitude, zoom } = this.state;
    const position = [latitude, longitude];

    return (
      <Map center={position} zoom={zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> Contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>The ISS&apos; location</Popup>
        </Marker>
      </Map>
    );
  }
}

ReactDOM.render(<MapBase />, document.getElementById('mapid'));
