import React, { Component } from 'react'; 
import '../stylesheets/PathSelector.css';

class PathSelector extends Component {
  constructor(props) {
    super(props);

    this.setValue = this.setValue.bind(this);
    this.generateOptions = this.generateOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  setValue(pathTerminus) {
    switch (pathTerminus) {
      case "start":
        const { startCoord } = this.props;
        return startCoord; 
      case "end":
        const { endCoord } = this.props;
        return endCoord; 
      default:
        return;  
    }
  }

  generateOptions() {
    let options = []; 
    const { featureData } = this.props;

    for (let featureId in featureData) {
      if (featureData.hasOwnProperty(featureId)) {
        let value = featureData[featureId].coordinate.cartesian_point;
        let name = featureData[featureId].name;
        let option = <option key={value} value={value}>{name}</option>;
        options.push(option); 
      }
    }

    return options; 
  }

  handleChange(pathTerminus, event) {
    const coordinate = event.target.value; 
    const { setCoords } = this.props;

    switch (pathTerminus) {
      case "start":
        const { endCoord } = this.props;
        setCoords(coordinate, endCoord);
        break;
      case "end":
        const { startCoord } = this.props; 
        setCoords(startCoord, coordinate);
        break;
      default:
        return;
    }
  }

  handleClick() {
    const { startCoord, endCoord, findPath } = this.props; 
    findPath(startCoord, endCoord);
  }

  render() {
    return (
      <div className="path-selector-container">
        <div className="path-selector-items">
          <div className="start-item">
            <span className="label">Start: </span>
            <select className="dropdown"
              value={this.setValue("start")}  
              onChange={this.handleChange.bind(null, "start")}>
              {this.generateOptions()}
            </select>
          </div>

          <div className="end-item">
            <span className="label">End: </span>
            <select className="dropdown"
              value={this.setValue("end")}  
              onChange={this.handleChange.bind(null, "end")}>
              {this.generateOptions()}
            </select>
          </div>

          <a href="#"
            className="button"
            onClick={this.handleClick}>
            Get From Point A to Point B
          </a>
        </div>  
      </div>
    );
  }
}

export default PathSelector;
