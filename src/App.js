import React, { Component } from 'react';
import axios from 'axios'; 
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { data: {} }; 
  }
  componentDidMount() {
    axios.get("https://building-map-api.herokuapp.com/")
      .then(res => {
        console.log(res.data);
        // this.setState({ data: res.data });
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
          A React app that fetches data from custom Rails JSON API hosted on Heroku
        </p>

        
      </div>
    );
  }
}

export default App;
