import React, { Component } from 'react';//load the react component module
import logo from './logo.svg';//import the logo
import './App.css';//load the app.css module

class App extends Component {
  state = {
    location: 'Vienna, Austria'
  };
  fetchData = (evt) => {
    evt.preventDefault();
    console.log('fetch data for ', this.state.location);
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
