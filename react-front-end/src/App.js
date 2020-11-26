import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './App.css';
import 'fontsource-roboto';
import JobCalendar from './components/JobCalendar'
import useApplicationData from './hooks/useApplicationData'
import Grid from '@material-ui/core/Grid';
import JobsOfDay from './components/JobsOfDay';
import AddJob from './components/Add Job/AddJob'
import JobsPanel from './components/JobsPanel';

export default function App(){
  const {jobs, tasks, users, calendar, addChangeAssignment, cancelAssignment, addChangeRequirement, cancelRequirement, addChangeJob, cancelJob} = useApplicationData();

  // selectDay - sets the currently selected day when navigating with the calendar
  const [selectDay, setSelectDay] = useState({starts: moment().startOf('day').toDate(), ends: moment().endOf('day').toDate()});
  // day - contains all the jobs for the selected day
  const [day, setDay] = useState([]);
  // selectedJob - the id of the currently selected job
  const [selectedJob, setSelectedJob] = useState(0);
  // job - the data for the currently selected job
  const [job, setJob] = useState({})

  useEffect(() => {
    const dayJobs = jobs.filter((job) => {
      let dayAssignments = job.assignments.filter((assignment) => {
        return (new Date(assignment.starts)) < selectDay.ends && (new Date(assignment.ends)) > selectDay.starts;
      })
      return dayAssignments.length !== 0;
    });
    setDay(dayJobs);
  }, [selectDay, jobs]);

  useEffect(() => {
    setJob(jobs.filter((job) => (job.id === selectedJob))[0])
  }, [selectedJob, jobs]);


  //START EXAMPLE FUNCTIONS
  //START EXAMPLE STATE
  const [{message, message2}, setState] = useState({message: 'Click the button to load data!', message2: 'Click to get a query'})
  const [id, setID] = useState(0);
  //END EXAMPLE STATE
  
  function fetchData() {
    // console.log("YYYYYYYYYYYYYY")
    // console.log(moment("2020-11-18T20:59"));
    // let job = jobs.filter((job) => job.id === id)[0];
    // console.log(job)
    // cancelJob(id)
    //   .then(() => {
    //     console.log("deleted ID", id);
    //     let job = jobs.filter((job) => job.id === id)[0];
    //     console.log("*** exit", job);
    //   });
    // cancelRequirement(id)
    //   .then(() => {
    //     console.log("deleted ID", id);
    //     let job = jobs.filter((job) => job.id === 5)[0];
    //     console.log("*** exit", job.requirements);
    //   });
    // let job = jobs.filter((job) => job.id === 5)[0];
    // console.log(job.assignments);
    // cancelAssignment(id)
    // .then(() => {
    //   console.log("deleted ID", id);
    //   let job = jobs.filter((job) => job.id === 5)[0];
    //   console.log("*** exit", job);
    // });
  }

  function query() {
    // console.log(day);
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
    //   .then((assignID) => {
    //     setID(assignID);
    //     console.log("assgned ID",assignID);
    //     let job = jobs.filter((job) => job.id === assignID)[0];
    //     console.log("*** enter", job);
        
    //   });
    // addChangeRequirement({
    //   job_id: 5,
    //   task_id: 5,
    //   difficulty: 5,
    //   estimate_time: 50,
    //   estimate_workers: 5,
    // })
    //   .then((asignID) => {
    //     setID(asignID);
    //     console.log("assgned ID",asignID);
    //     let job = jobs.filter((job) => job.id === 5)[0];
    //     //let assignment = job.assignments.filter((assignment) => assignment.id === asignID)[0];
    //     console.log("*** enter", job.requirements);
    //   });
    // addChangeAssignment({
    //   job_id: 5,
    //   user_id: 49,
    //   starts: '2015-03-25T12:00:00-06:30',
    //   ends: '2020-24-16T13:00:00-06:00',
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
  //END EXAMPLE FUNCTIONS
  
  return (
    <div className="App">
      {/* START EXAMPLE COMPONENTS */}
      <h1>{ message }</h1>
      <button onClick={fetchData} >
        Fetch Data
      </button> 
      <h1>{ message2 }</h1>
      <button onClick={query} >
        query
      </button>
      {/* END EXAMPLE COMPONENETS */}
      <Grid container spacing={1}>
        <Grid  item xs>
          <JobCalendar bookings={calendar} setDay={setSelectDay} selectedDay={selectDay} setSelectedJob={setSelectedJob}/>
        </Grid>
        <Grid  item xs>
          {/* <JobSummary jobs= {jobs} /> */}
          {/* <JobsOfDay jobs={day}/> */}
          {/* <AddJob tasks={tasks} users={users} addChangeJob={addChangeJob}/> */}
          
        </Grid>
      </Grid>
    </div>
  );
}