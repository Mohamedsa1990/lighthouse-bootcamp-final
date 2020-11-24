import React, { useState } from 'react';
import './App.css';
import 'fontsource-roboto';
import JobCalendar from './components/JobCalendar'
//import JobSummary from './components/JobSummary'
import useApplicationData from './hooks/useApplicationData'
import Grid from '@material-ui/core/Grid';

export default function App(){
  //EXAMPLE DATA FETCH
  const [{message, message2}, setState] = useState({message: 'Click the button to load data!', message2: 'Click to get a query'})
  const [id, setID] = useState(0);
  function fetchData() {
    // addChangeJob({
    //   name: 'total Junk',
    //   notes: 'you do not want to know',
    //   status: 'Quote Requested',
    //   estimate_total_time: 15,
    //   estimate_total_workers: 25,
    //   estimate_travel_time: 45,
    //   customer_first_name: 'Jackie',
    //   customer_last_name: 'Verecker',
    //   customer_address: '8607 Meadow Vale Avenue',
    //   customer_city: 'Zlataritsa',
    //   customer_phone_number: '994-624-0020',
    //   customer_email: 'jverecker1q@imageshack.us',
    // })
    
    
    cancelRequirement(id)
      .then(() => {
        console.log("deleted ID", id);
        let job = jobs.filter((job) => job.id === 5)[0];
        console.log("*** exit", job.requirements);
      });
    // console.log(job.assignments);
    // cancelAssignment(id)
    // .then(() => {
    //   console.log("deleted ID", id);
    //   let job = jobs.filter((job) => job.id === 5)[0];
    //   console.log("*** exit", job);
    // });
  }

  function query() {
    addChangeRequirement({
      job_id: 5,
      task_id: 5,
      difficulty: 5,
      estimate_time: 50,
      estimate_workers: 5,
    })
      .then((asignID) => {
        setID(asignID);
        console.log("assgned ID",asignID);
        let job = jobs.filter((job) => job.id === 5)[0];
        //let assignment = job.assignments.filter((assignment) => assignment.id === asignID)[0];
        console.log("*** enter", job.requirements);
      });
    // addChangeAssignment({
    //   job_id: 5,
    //   user_id: 49,
    //   starts: '2020-11-16T08:00:00-06:00',
    //   ends: '2020-11-16T13:00:00-06:00',
    //   estimate_hrs: 4, 
    // })
    //   .then((asignID) => {
    //     setID(asignID);
    //     console.log("assgned ID",asignID);
    //     let job = jobs.filter((job) => job.id === 5)[0];
    //     let assignment = job.assignments.filter((assignment) => assignment.id === asignID)[0];
    //     console.log("*** enter", job.assignments);
    //   });
  }

  const {jobs, calendar, addChangeAssignment, cancelAssignment, addChangeRequirement, cancelRequirement} = useApplicationData();
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