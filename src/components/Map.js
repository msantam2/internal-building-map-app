import React, { Component } from 'react'; 
import '../stylesheets/Map.css';
import MapUnit from './MapUnit';

class Map extends Component {
  render() {
    this.structureFeatureData();

    return (
      <div className="map">
        {this.renderRows()}
      </div>
    ); 
  }

  renderRows() {
    const { dimensions } = this.props;
    // We are setting up the map to have an origin point (0, 0) at the
    // TOP-LEFT of the map.
    // Also, each MapUnit will be defined, and located, by its BOTTOM-LEFT point
    // Thus, "yCoords" effectively represents each row. i.e. the first row is down one, or -1. This is so its first MapUnit, then, will have a bottom-left point with a yCoord of -1. This way everything lines up.  
    let yCoords = [];
    for (let i = -1; i >= -dimensions; i--) {
      yCoords.push(i);
    }

    return yCoords.map(yCoord => (
        <div key={yCoord} className="map-row">
          {this.renderMapUnits(yCoord)}
        </div>
      )
    );
  }

  renderMapUnits(yCoord) {
    const { dimensions } = this.props;
    let xCoords = [];
    for (let i = 0; i < dimensions; i++) {
      xCoords.push(i);
    }

    return xCoords.map(xCoord => {
      const cartesianPoint = `(${xCoord}, ${yCoord})`;
      const name = this.FEATURES[cartesianPoint];
      const sideToHighlight = null; 

      return (
        <MapUnit
          key={cartesianPoint}  
          cartesianPoint={cartesianPoint}
          name={name}
          sideToHighlight={sideToHighlight}
        />
      );
    });
  }

  structureFeatureData() {
    const { featureData } = this.props;
    this.FEATURES = {};
    for (let featureId in featureData) {
      if (featureData.hasOwnProperty(featureId)) {
        let cartesianPoint = featureData[featureId].coordinate.cartesian_point; 
        let name = featureData[featureId].name;
        this.FEATURES[cartesianPoint] = name; 
      }
    }
  }
}

export default Map;
 