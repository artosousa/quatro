import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import './App.css';
import Storage from './components/storage';
import Marker from './components/marker';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storageUnits: [],
      allStorageUnits:[],
      selectedStorage: null,
      search: ""
    };
  }

  componentWillMount() {
    const url = "https://raw.githubusercontent.com/lewagon/flats-boilerplate/master/flats.json";
    fetch (url)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          storageUnits: data,
          allStorageUnits: data
        });
      })
  }

  selectStorage  = (storage) => {
    this.setState({
      selectedStorage: storage
    })
  }

  handleSearch = (event) => {
    //debugger
    this.setState({
      search: event.target.value,
      storageUnits: this.state.allStorageUnits.filter((storage) => new RegExp(event.target.value, "i").exec(storage.name))
    });
  }

  render() {
    let center = {
      lat:  48.8566,
      lng:  2.3522
    }
    let zoom = 11;
    if (this.state.selectedStorage) {
      center = {
        lat: this.state.selectedStorage.lat,
        lng: this.state.selectedStorage.lng
      }
      zoom = 13;

    }

    return (
      <div className="app">
        <div className="main">
          <div className="search">
            <input
              type ="text"
              placeholder="Search..."
              value={this.state.search}
              onChange={this.handleSearch} />
          </div>
          <div className="storage-rooms">
            {this.state.storageUnits.map((storage) => {
              return <Storage
                key={storage.name}
                storage={storage}
                selectStorage={this.selectStorage} />
            })}
          </div>
        </div>
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyCA3QGmJR6uCJbmMXFJqn8cXmN3rd98hEs'}}
            center={center}
            zoom = {zoom}
          >
          {this.state.storageUnits.map((storage) => {
            return <Marker
            key={storage.name}
            lat={storage.lat}
            lng={storage.lng}
            text={storage.price}
            selected={storage === this.state.selectedStorage}  />
          })}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

export default App;
