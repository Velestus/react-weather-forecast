import React, { Component } from 'react';
import './weather-display.css';

class WeatherDisplay extends Component {
  render() {
    return (
      <div>
        <h4 className="WeatherDisplay">{this.props.location}</h4>
        <h4 className="WeatherDisplay inline">{this.props.temp + " "}</h4>  
        <i className={this.props.tempUnit + " TempUnit inline"} onClick={() => this.props.onClick()}></i>
        <h4 className="WeatherDisplay">{this.props.weather}</h4>
        <i className={this.props.image} id="WeatherImage" alt={this.props.imgAlt}></i>
      </div>
    );
  }
}

export default WeatherDisplay;