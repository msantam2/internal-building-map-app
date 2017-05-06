import React from 'react';
import '../stylesheets/MapUnit.css';

const MapUnit = ({ cartesianPoint, name, sideToHighlight }) => {
  let style; 
  if (name) {
    style = { "backgroundColor": "orange" };
  }
  
  return (
    <div className="map-unit" style={style}>
      <p className="map-unit-name">{name}</p>
    </div>
  );
};

export default MapUnit;
