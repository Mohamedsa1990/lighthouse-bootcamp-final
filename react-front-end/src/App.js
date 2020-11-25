import React, { useState } from 'react';
import './App.css';
import 'fontsource-roboto';
import JobCalendar from './components/JobCalendar'
import JobSummary from './components/JobSummary'
import useApplicationData from './hooks/useApplicationData'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import AddJob from './components/Add Job/AddJob'

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
    addChangeAssignment({
      job_id: 87,
      user_id: 49,
      starts: '2020-11-16T9:00:00-06:00',
      ends: '2020-11-16T13:00:00-06:00',
      estimate_hrs: 4, 
    })
  }

  const {calendar, addChangeJob, addChangeAssignment, jobs, tasks, users} = useApplicationData();
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
        <Grid container spacing={1}>
          <Grid  item xs>
            <JobCalendar bookings={calendar}/>
          </Grid>
          <Grid  item xs>
            {/* <JobSummary jobs={jobs}/> */}
            <AddJob tasks={tasks} users={users} addChangeJob={addChangeJob}/>
          </Grid>
        </Grid>
    </div>
  );
}