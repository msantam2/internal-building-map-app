import React, { Component } from 'react'; 
import '../stylesheets/PathSelector.css';

class PathSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startCoord: "",
      endCoord: ""
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.generateOptions = this.generateOptions.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      const { featureData } = nextProps; 
      let startCoord;
      let endCoord;
      startCoord = endCoord = featureData["1"].coordinate.cartesian_point;
      this.setState({ startCoord: startCoord, endCoord: endCoord });
    }
  }

  handleChange(pathTerminus, event) {
    const coordinate = event.target.value; 
    let newState = Object.assign({}, this.state);

    switch (pathTerminus) {
      case "start":
        newState["startCoord"] = coordinate;
        this.setState(newState);
        break;
      case "end":
        newState["endCoord"] = coordinate;
        this.setState(newState);
        break;
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
  
  render() {
    return (
      <div className="path-selector-container">
        <div className="path-selector-items">
          <div className="start-item">
            <span className="label">Start: </span>
            <select className="dropdown"
              onChange={this.handleChange.bind(null, "start")}>
              {this.generateOptions()}
            </select>
          </div>

          <div className="end-item">
            <span className="label">End: </span>
            <select className="dropdown"
              onChange={this.handleChange.bind(null, "end")}>
              {this.generateOptions()}
            </select>
          </div>

          <a href="#" className="button">Get From Point A to Point B</a>
        </div>  
      </div>
    );
  }
}

export default PathSelector;
