import React, { Component } from 'react';
import logo from './logo.svg';
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getWeather);
    }
  }
  getWeather(position) {
    var longitude = position.coords.longitude;
    var latitude = position.coords.latitude;
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
    console.log(weather);
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
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <WeatherCaption />
        <ForecastTrigger onClick={() => this.handleClick()}/>
        <WeatherDisplay 
          {...this.state}
          onClick={() => this.calculateTempUnit()}
        />
      </div>
    );
  }
}

export default App;
