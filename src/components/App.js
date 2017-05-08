import React, { Component } from 'react';
import axios from 'axios'; 
import '../stylesheets/App.css';
import Map from './Map';
import PathSelector from './PathSelector';
import { findStepsOfPath, findSidesToHighlight } from '../utils/PathUtils';
  
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
    this.findPath = this.findPath.bind(this);
  }

  setCoords(startCoord, endCoord) {
    this.setState({ startCoord, endCoord });
  }
  
  componentDidMount() {
    axios.get("https://building-map-api.herokuapp.com/")
      .then(res => {
        const featureData = res.data; 
        this.setState({
          featureData: featureData,
          startCoord: featureData["1"].coordinate.cartesian_point,
          endCoord: featureData["1"].coordinate.cartesian_point
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  findPath(startCoord, endCoord) {
    const { dimensions } = this.state;
    const path = findStepsOfPath(startCoord, endCoord, dimensions);
    console.log(path);
  }

  render() {
    const { featureData, startCoord, endCoord, dimensions } = this.state; 
    
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
            startCoord={startCoord}
            endCoord={endCoord}
            setCoords={this.setCoords}
            findPath={this.findPath}
          />
        </div>
      </div>
    );
  }
}

export default App;
