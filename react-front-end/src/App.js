import React, { useState } from 'react';
import './App.css';
import 'fontsource-roboto';
import JobCalendar from './components/JobCalendar'
import JobSummary from './components/JobSummary'
import useApplicationData from './hooks/useApplicationData'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';

export default function App(){
  //EXAMPLE DATA FETCH
  const [{message, message2}, setState] = useState({message: 'Click the button to load data!', message2: 'Click to get a query'})
  const [id, setID] = useState(0);
  function fetchData() {
    console.log("starting save")
    const assignedJob = jobs.filter((job) => job.id === 6)[0];
    console.log(assignedJob.requirements.length)
    addChangeRequirement({
      job_id: 6,
      task_id: 6,
      difficulty: 3,
      estimate_time: 10,
      estimate_workers: 3,
    })
    .then((asignID) => {
        setID(asignID);
        const assignedJob = jobs.filter((job) => job.id === 6)[0];
        console.log(assignedJob.requirements.length)
        console.log("assgned ID", asignID);
      });

  }

  function query() {
    const assignedJob = jobs.filter((job) => job.id === 6)[0];
    console.log("****",assignedJob.requirements.length);
    cancelRequirement(id)
      .then(() => {
        console.log("****",assignedJob.requirements.length);
      })
    
  }

  const {calendar, jobs, addChangeJob, addChangeRequirement, cancelRequirement} = useApplicationData();
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
            {/* <JobSummary /> */}
          </Grid>
        </Grid>
    </div>
  );
}