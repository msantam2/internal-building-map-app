import React, { Component } from 'react'; 
import '../stylesheets/PathSelector.css';

class PathSelector extends Component { // this.props.featureData :)
  render() {
    return (
      <div className="path-selector-container">
        <div className="path-selector-items">
          <div className="start-item">
            <span className="label">Start: </span>
            <select className="dropdown">
              <option>One</option>
              <option>Two</option>
              <option>Three</option>
            </select>
          </div>

          <div className="end-item">
            <span className="label">End: </span>
            <select className="dropdown">
              <option value="a">A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>

          <a href="#" className="button">Get From Point A to Point B</a>
        </div>  
      </div>
    );
  }
}

export default PathSelector;
