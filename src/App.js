import React, { Component } from 'react';//load the react component module
import logo from './logo.svg';//import the logo
import './App.css';//load the app.css module

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <h1>Weather</h1>
      </div>
    );
  }
}

export default App;//export the component 'app'
