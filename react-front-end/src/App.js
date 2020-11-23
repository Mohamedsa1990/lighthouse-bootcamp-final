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
    addChangeJob({
      name: 'total Junk',
      notes: 'you do not want to know',
      status: 'Quote Requested',
      estimate_total_time: 15,
      estimate_total_workers: 25,
      estimate_travel_time: 45,
      customer_first_name: 'Jackie',
      customer_last_name: 'Verecker',
      customer_address: '8607 Meadow Vale Avenue',
      customer_city: 'Zlataritsa',
      customer_phone_number: '994-624-0020',
      customer_email: 'jverecker1q@imageshack.us',
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

  const {calendar, addChangeJob} = useApplicationData();
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
