import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import 'fontsource-roboto';
import JobCalendar from './components/JobCalendar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!',
      message2: 'Click to get a query'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  query = () => {
    axios.get('/api/query') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.first_name) // Just the message
      this.setState({
        message2: response.data.first_name
      });
    }) 
  }

  render() {
    return (
      <div className="layout">
        {/* <h1>{ this.state.message }</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button> 
        <h1>{ this.state.message2 }</h1>
        <button onClick={this.query} >
          query
        </button> */}
        <JobCalendar/>
      </div>
    );
  }
}

export default App;
