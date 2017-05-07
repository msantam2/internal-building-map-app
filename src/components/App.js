import React, { Component } from 'react';
import axios from 'axios'; 
import '../stylesheets/App.css';
import Map from './Map';
import PathSelector from './PathSelector';
  
class App extends Component {
  constructor() {
    super();
    this.state = { featureData: {} }; 
  }
  
  componentDidMount() {
    axios.get("https://building-map-api.herokuapp.com/")
      .then(res => {
        this.setState({ featureData: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  render() {
    return (
      <div className="app">
        <strong><p className='app-title'>Internal Building Map App</p></strong>
        <p className='app-subtitle'>
          A React app that fetches data from custom-built Rails JSON API hosted on Heroku
        </p>

        <div className="map-container">
          <Map featureData={this.state.featureData} dimensions={4} />
          <PathSelector featureData={this.state.featureData} />
        </div>
      </div>
    );
  }
}

export default App;
