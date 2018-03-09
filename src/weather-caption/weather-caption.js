import React, { Component } from 'react';
import './weather-caption.css';

class WeatherCaption extends Component {
  render() {
    return (
      <div className="WeatherCaption">
        <h2>Weather F<span><i className="wi wi-rain"></i></span>recast</h2>
      </div>
    );
  }
}

export default WeatherCaption;