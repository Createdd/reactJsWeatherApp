import React, { Component } from 'react';//load the react component module
import logo from './logo.svg';//import the logo
import './App.css';//load the app.css module
import xhr from 'xhr';

class App extends Component {
  state = {
    location: 'Vienna, Austria'
  };
  fetchData = (evt) => {
    evt.preventDefault();
    const location = encodeURIComponent(this.state.location);
    //const urlPrefix = '';
    //const urlSuffix = '';
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=d883d9e37b80e2e5aca55aca4e71e0be&units=metric`;
    var self = this;//bind this to a variable since we want a reference to the function and not the component
    xhr({
      url: url
    }, function(err,data){
      self.setState({
        data: JSON.parse(data.body)//parse the string into an object
      })//save the data to the render state
    });
  };//create a fetchData function
  changeLocation = (evt) => {
    this.setState({
      location: evt.target.value
    });
  };
  render() {
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
        </div>
      </div>
    );
  }
}

export default App;//export the component 'app'
