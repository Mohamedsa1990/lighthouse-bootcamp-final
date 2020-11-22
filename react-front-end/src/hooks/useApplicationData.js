
import { useState, useEffect } from "react";
import axios from "axios";
const testData = [{
  id: 0,
  title: 'All Day Event very long title',
  allDay: true,
  start: new Date(2020, 11, 0),
  end: new Date(2020, 11, 1),
},
{
  id: 1,
  title: 'Long Event',
  start: new Date(2020, 11, 7),
  end: new Date(2020, 11, 10),
},

{
  id: 2,
  title: 'DTS STARTS',
  start: new Date(2020, 11, 13, 0, 0, 0),
  end: new Date(2020, 11, 20, 0, 0, 0),
},

{
  id: 3,
  title: 'DTS ENDS',
  start: new Date(2020, 11, 6, 0, 0, 0),
  end: new Date(2020, 11, 13, 0, 0, 0),
},

{
  id: 4,
  title: 'Some Event',
  start: "2020, 11, 9",
  end: "2020, 11, 16",
},
{
  id: 5,
  title: 'Conference',
  start: new Date(2020, 11, 11),
  end: new Date(2020, 11, 13),
  desc: 'Big conference for important people',
}];
/**
 * useApplicationData - a custom hook for managing
 * main site data and maintaining consistency with the server 
 */
export default function useApplicationData(){
  //*****STATE HOOKS START
  //calendar - the main calendar data
  const [calendar, setCalendar] = useState(testData);
  //bookings - holds all the data about bookings(not just what can be passed to calendar)
  const [jobs, setJobs] = useState([]);
  //*****STATE HOOKS END

  //Load all initial site data
  useEffect(() => {
    Promise.all([
      axios.get("/api/jobs"),
      //OTHER INITIAL SITE LOAD DATA REQUESTS HERE
    ])
      .then((all) => {
        //load bookings into calendar array
        let jobList = all[0].data;
        let calendarEntries = [];
        for (const job of jobList) {
          let dates = [];
          let calendarIDs = [];
          for (const assignment of job.assignments) {
            if (!dates.includes(assignment.starts)) {
              dates.push(assignment.starts);
              let index = calendarEntries.length
              calendarIDs.push(index);
              calendarEntries.push({
                id: index,
                title: job.name,
                desc: `Workers: ${job.estimate_total_workers}, Time(p-hrs): ${job.estimate_total_time}`,
                start: (new Date(assignment.starts)),
                end: (new Date(assignment.ends))
              });
            }
          }
          job.calendarIDs = calendarIDs;
        }
        setJobs(jobList);
        setCalendar(calendarEntries);
        //OTHER INITIAL SITE LOAD DATA SAVING HERE
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, []);

  const addChangeJob = function(jobDetails) {
    if (!jobDetails.id) {
      //job id=0 > new job
      jobDetails.id = 0;
    }
    return axios.put(`/api/job/${jobDetails.id}`, jobDetails)
    .then((response) => {
      let newJob = {...jobDetails, id: response.id};
      let calendarEntries = [...calendar]
      let dates = [];
      let calendarIDs = [];
      if (jobDetails.id !== 0) {
        calendarIDs = jobDetails.calendarIDs;
        for(const index of calendarIDs){
          calendarEntries = calendarEntries.splice(index, 1);
        }
      }
      for (const assignment of newJob.assignments) {
        if (!dates.includes(assignment.starts)) {
          dates.push(assignment.starts);
          let index = calendarEntries.length
          calendarIDs.push(index);
          calendarEntries.push({
            id: index,
            title: newJob.name,
            desc: `Workers: ${newJob.estimate_total_workers}, Time(p-hrs): ${newJob.estimate_total_time}`,
            start: (new Date(assignment.starts)),
            end: (new Date(assignment.ends))
          });
        }
      }
      setCalendar(calendarEntries);
      setJobs((old) => {
        let output = [...old]
        let oldJob = output.filter((job) => newJob.id === job.id)[0];
        if (oldJob) {
          oldJob = newJob;
        } else {
          output.push(newJob);
        }
        return output;
      });
    })
    .catch((e) => {
      console.log("*************Error Saving Job************");
      return e;
    });
  };

  function cancelJob(id) {
    //request that the server delete the Job
    return axios.delete(`/api/jobs/${id}`)
    .then(() => {
      let jobIndex = jobs.map((job) => job.id).indexOf(id);
      let newCalendar = [...calendar];
      let newJobs = [...jobs];
      for (const id of jobs[jobIndex].calendarIDs) {
        newCalendar = newCalendar.splice(id, 1);
      }
      newJobs = newJobs.splice(jobIndex, 1);
      setCalendar(newCalendar);
      setJobs(newJobs);
    })
    .catch((e) => {
      console.log("*************Error Deleting Job************");
      return e;
    });
  };

  return {calendar, addChangeJob, cancelJob};
};