import React, { useState } from 'react';
import './App.css';
import 'fontsource-roboto';
import JobCalendar from './components/JobCalendar'
import useApplicationData from './hooks/useApplicationData'
import axios from 'axios'


export default function App(){
  //EXAMPLE DATA FETCH
  const [{message, message2}, setState] = useState({message: 'Click the button to load data!', message2: 'Click to get a query'})
  function fetchData() {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      setState((oldState) => {
        return { ...oldState, message: response.data.message}
      });
    }) 
  }

  function query() {
    axios.get('/api/query') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data); // The entire response from the Rails API

      console.log(response.data.first_name); // Just the message
      setState((oldState) => {
        return { ...oldState, message2: response.data.first_name}
      });
    }) 
  }

  const {calendar} = useApplicationData();
  return (
    <div className="App">
      <h1>{ message }</h1>
      <button onClick={fetchData} >
        Fetch Data
      </button> 
      <h1>{ message2 }</h1>
      <button onClick={query} >
        query
      </button>
      <JobCalendar bookings={calendar}/>
    </div>
  );
}
