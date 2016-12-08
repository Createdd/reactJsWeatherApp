import React, { Component } from 'react';//load the react component module
import logo from './logo.svg';//import the logo
import './App.css';//load the app.css module
import xhr from 'xhr';
import Plot from './Plot.jsx';

class App extends Component {
  state = {
    location: '',
    data: {},
    dates: [],
    temps: [],
    selected: {
      date: '',
      temp: null
    }
  };

  function changeLocation(location){
    return{
      type: 'CHANGE_LOACTION',
      location: location
    };
  }

  function mainReducer(state, action){
    switch (action.type){
      case 'CHANGE_LOACTION':
        return Object.assign({}, state,{
          location: action.location
        });
      default:
        return state;
    };
  }

  fetchData = (evt) => {
    evt.preventDefault();
    var location = encodeURIComponent(this.state.location);
    //const urlPrefix = '';
    //const urlSuffix = '';
    var url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=d883d9e37b80e2e5aca55aca4e71e0be&units=metric`;
    var self = this;//bind this to a variable since we want a reference to the function and not the component
    xhr({
      url: url
    }, function (err, data) {
      var body = JSON.parse(data.body);//parse the string into an object
      var list = body.list;
      var dates = [];
      var temps = [];
      for (var i = 0; i < list.length; i++) {
        dates.push(list[i].dt_txt);
        temps.push(list[i].main.temp);
      }
      /* Save the data, and reset the selected time to the default values */
      self.setState({
        data: body,
        dates: dates,
        temps: temps,
        selected: {
          date: '',
          temp: null
        }
      });//set the state to the body data and dates and temperatures
    });//xhr
  };//create a fetchData function
  changeLocation = (evt) => {
    this.props.dispatch(changeLocation(evt.target.value));
    });
  };
  onPlotClick = (data) => {
    if (data.points) {
      this.setState({
        selected: {
          date: data.points[0].x,
          temp: data.points[0].y
        }
      });
    }
  };
  render() {
    var currentTemp = 'Not loaded yet';
    if (this.state.data.list) {
      currentTemp = this.state.data.list[0].main.temp;
    }
    console.log(this.state.data)
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
                placeholder={'City, Country'}
                type='text'
                value={this.state.location}
                onChange={this.changeLocation}
              />
            </label>
          </form>
          {/*
          Render the current temperature and the forecast if we have data
          otherwise return null
        */}
          {(this.state.data.list) ? (
            <div className="wrapper">
               {/* Render the current temperature if no specific date is selected */}
               <p className="temp-wrapper">
                 <span className="temp">
                   { this.state.selected.temp ? this.state.selected.temp : currentTemp }
                 </span>
                 <span className="temp-symbol">°C</span>
                 <span className="temp-date">
                   { this.state.selected.temp ? this.state.selected.date : ''}
                 </span>
               </p>
               <h2>Forecast</h2>
             <Plot
                xData={this.state.dates}
                yData={this.state.temps}
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

export default App;//export the component 'app'
