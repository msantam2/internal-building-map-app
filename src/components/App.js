import React, { Component } from 'react';
import axios from 'axios'; 
import '../stylesheets/App.css';
import Map from './Map';
import PathSelector from './PathSelector';
import { findPath, findSidesToHighlight } from '../utils/PathUtils';
  
class App extends Component {
  constructor() {
    super();
    this.state = {
      featureData: {},
      startCoord: "",
      endCoord: "",
      dimensions: 4
    }; 

    this.setCoords = this.setCoords.bind(this);
  }

  setCoords(startCoord, endCoord) {
    this.setState({ startCoord, endCoord });
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
  
  componentWillUpdate(_, nextState) {
    const { startCoord, endCoord } = nextState; 
    const path = findPath(startCoord, endCoord );

  }

  render() {
    const { featureData, dimensions } = this.state; 
    
    return (
      <div className="app">
        <strong><p className='app-title'>Internal Building Map App</p></strong>
        <p className='app-subtitle'>
          A React app that fetches data from custom-built Rails JSON API hosted on Heroku
        </p>

        <div className="map-container">
          <Map
            featureData={featureData}
            dimensions={dimensions}
          />
          <PathSelector
            featureData={featureData}
            setCoords={this.setCoords}
          />
        </div>
      </div>
    );
  }
}

export default App;
