import React, { Component } from 'react';
import './forecast-trigger.css';

class ForecastTrigger extends Component {
  render() {
    return (
      <div className="ForecastTrigger">
        <h3 onClick={() => this.props.onClick()}>Click here to get weather from your neighbourhood</h3>
      </div>
    );
  }
}

export default ForecastTrigger;