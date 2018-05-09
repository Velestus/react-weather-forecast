import React, { Component } from 'react';
import './App.css';
import WeatherCaption from './weather-caption/weather-caption'
import ForecastTrigger from './forecast-trigger/forecast-trigger'
import WeatherDisplay from './weather-display/weather-display'

class App extends Component {
  constructor(props) {
    super(props);
    this.getWeather = this.getWeather.bind(this);
    this.assignWeatherIcon = this.assignWeatherIcon.bind(this);
    this.state = {
      location: '',
      weather: '',
      temp: '',
      tempUnit: '',
      image: '',
      imgAlt: ''
    };
  }
  handleClick() {
    var app = this;
    fetch('http://ip-api.com/json').then(res => res.json())
      .then(function(myJson) {
        var position = {
          longitude: myJson.lon,
          latitude: myJson.lat
        };
        app.getWeather(position);
      });
  }
  getWeather(position) {
    var longitude = position.longitude;
    var latitude = position.latitude;
    var url = "https://fcc-weather-api.glitch.me/api/current?lon="+longitude+"&lat="+latitude;
    fetch(url).then( res => res.json() )
      .then( res => {
        this.assignWeatherIcon(res.weather[0].main)
        this.calculateTempUnit()
        this.setState({
          location: res.name + ", " + res.sys.country,
          weather: res.weather[0].main,
          temp: res.main.temp,
          imgAlt: res.weather[0].description,
        });
    });
  }
  calculateTempUnit() {
    var newTemp = 0;
    if (this.state.tempUnit === "wi wi-celsius") {
      newTemp = this.state.temp * 9 / 5 + 32;
      this.setState({
        temp: newTemp,
        tempUnit: "wi wi-fahrenheit",
      });
    } else {
      newTemp = Math.round((this.state.temp - 32) * 5 / 9);
      this.setState({
        temp: newTemp,
        tempUnit: "wi wi-celsius",
      });
    }
  }
  assignWeatherIcon(weather) {
    var iconClass = ''
    switch (weather.toLowerCase()) {
      case 'drizzle':
        iconClass = 'wi wi-day-sprinkle';
        break;
      case 'clouds':
        iconClass = 'wi wi-day-cloudy';
        break;
      case 'rain':
        iconClass = 'wi wi-day-rain';
        break;
      case 'snow':
        iconClass = 'wi wi-day-snow';
        break;
      case 'clear':
        iconClass = 'wi wi-day-sunny';
        break;
      case 'thunderstorm':
        iconClass = 'wi wi-day-thunderstorm';
        break;
      default:
        iconClass = 'wi wi-refresh';
    }
    this.setState({
      image: iconClass,
    });
  }

  render() {
    return (
      <div className="App">
        <WeatherCaption />
        <ForecastTrigger onClick={this.handleClick.bind(this)}/>
        <WeatherDisplay 
          {...this.state}
          onClick={() => this.calculateTempUnit()}
        />
      </div>
    );
  }
}

export default App;
