import React, { Component } from 'react';//load the react component module
import logo from './logo.svg';//import the logo
import './App.css';//load the app.css module
import Plot from './Plot.jsx';
import { connect } from 'react-redux';
import {
  changeLocation,
  setSelectedDate,
  setSelectedTemp,
  fetchData
} from './action';

class App extends Component {
  fetchData = (evt) => {
    evt.preventDefault();
    var location = encodeURIComponent(this.props.location);
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=d883d9e37b80e2e5aca55aca4e71e0be&units=metric`;
    this.props.dispatch(fetchData(url));
  };//create a fetchData function
  onPlotClick = (data) => {
    if (data.points) {
      var number = data.points[0].pointNumber;
      this.props.dispatch(setSelectedDate(data.points[0].x));
      this.props.dispatch(setSelectedTemp(data.points[0].y));
    }
  };
  changeLocation = (evt) => {
    this.props.dispatch(changeLocation(evt.target.value));
  };
  render() {
    var currentTemp = 'Not loaded yet';
    if (this.props.data.list) {
      currentTemp = this.props.data.list[0].main.temp;
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <div>
          <h1>Weather</h1>
          <form onSubmit={this.fetchData}>
            <label>I want to know the weather for
              <input
                placeholder={"City, Country"}
                type="text"
                value={this.props.location}
                onChange={this.changeLocation}
              />
            </label>
          </form>
          {/*
          Render the current temperature and the forecast if we have data
          otherwise return null
        */}
        {(this.props.data.list) ? (
          <div>
            {/* Render the current temperature if no specific date is selected */}
            {(this.props.selected.temp) ? (
              <p>The temperature on { this.props.selected.date } will be { this.props.selected.temp }°C</p>
            ) : (
              <p>The current temperature is { currentTemp }°C!</p>
            )}
            <h2>Forecast</h2>
            <Plot
              xData={this.props.dates}
              yData={this.props.temps}
              onPlotClick={this.onPlotClick}
              type="scatter"
            />
          </div>
        ) : null}
        </div>
      </div>
    );
  }
}

// Since we want to have the entire state anyway, we can simply return it as is!
function mapStateToProps(state) {
  return state.toJS();
}

export default connect(mapStateToProps)(App);
