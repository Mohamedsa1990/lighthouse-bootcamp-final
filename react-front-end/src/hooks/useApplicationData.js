
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
        setJobs(jobList);
        //OTHER INITIAL SITE LOAD DATA SAVING HERE
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, []);

  useEffect(() => {
    console.log("calendar Reload")
    let calendarEntries = [];
    for (const job of jobs) {
      let dates = [];
      for (const assignment of job.assignments) {
        if (!dates.includes(assignment.starts)) {
          dates.push(assignment.starts);
          let index = calendarEntries.length;
          calendarEntries.push({
            id: index,
            title: job.name,
            desc: `Workers: ${job.estimate_total_workers}, Time(p-hrs): ${job.estimate_total_time}`,
            start: (new Date(assignment.starts)),
            end: (new Date(assignment.ends))
          });
        }
      }
    }
    setCalendar(calendarEntries);
  }, [jobs])

  const addChangeJob = function(jobDetails) {
    //check if it is a new job, then all details will be new
    if (!jobDetails.id) {
      //job id=0 -> new job
      jobDetails.id = 0;
    }
    console.log("************saving Job*************")
    return axios.put(`/api/jobs/${jobDetails.id}`, jobDetails)
    .then((response) => {
      let newJob = {...jobDetails, id: response.data};
      
      setJobs((old) => {
        let output = [...old]
        let oldJob = output.filter((job) => newJob.id === job.id)[0];
        if (oldJob) {
          oldJob = {...oldJob, ...newJob};//replaces only the keys in newJob
        } else {
          newJob.assignments = [];
          newJob.requirements = [];
          output.push(newJob);
        }
        return output;
      });
      return response.data;
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
      let newJobs = [...jobs];
      newJobs.splice(jobIndex, 1);
      setJobs(newJobs);
    })
    .catch((e) => {
      console.log("*************Error Deleting Job************");
      return e;
    });
  };

  const addChangeAssignment = function(assignmentDetails) {
    //check if it is a new assignment, then all details will be new
    if (!assignmentDetails.id) {
      //job id=0 -> new job
      assignmentDetails.id = 0;
    }

    return axios.put(`/api/assignments/${assignmentDetails.id}`, assignmentDetails)
    .then((response) => {
      let newAssignment = {...response.data};
      setJobs((old) => {
        let output = [...old]
        let job = output.filter((job) => newAssignment.job_id === job.id)[0];
        job = {...job};
        let assignment = job.assignments.filter((assignment) => newAssignment.id === assignment.id)[0];
        if (assignment) {
          assignment = {...newAssignment};
        } else {
          job.assignments.push(newAssignment);
        }
        return output;
      });
      return response.data.id;
    })
    .catch((e) => {
      console.log("*************Error Saving Job************");
      return e;
    });
  };

  function cancelAssignment(id) {
    //request that the server delete the Job
    console.log(id);
    return axios.delete(`/api/assignments/${id}`)
    .then(() => {
      let jobList = [...jobs];
      let job = jobList.filter((job) => {
        let assignment = job.assignments.filter((assignment) => id === assignment.id)[0];
        if (assignment) return true; else return false;
      })[0];
      job = {...job}
      console.log("before");
      for(const assignment of job.assignments){
        console.log(assignment.id);
      }
      let index = job.assignments.map((assignment) => assignment.id).indexOf(id);
      job.assignments.splice(index, 1);
      console.log("after");
      for(const assignment of job.assignments){
        console.log(assignment.id);
      }
      setJobs(jobList)
    })
    .catch((e) => {
      console.log("*************Error Deleting Job************");
      return e;
    });
  };

  const addChangeRequirement = function(requirementDetails) {
    //check if it is a new requirement, then all details will be new
    if (!requirementDetails.id) {
      //job id=0 -> new job
      requirementDetails.id = 0;
    }

    return axios.put(`/api/requirements/${requirementDetails.id}`, requirementDetails)
    .then((response) => {
      let newRequirement = {...response.data};
      setJobs((old) => {
        let output = [...old]
        let job = output.filter((job) => newRequirement.job_id === job.id)[0];
        job = {...job};
        let requirement = job.requirements.filter((requirement) => newRequirement.id === requirement.id)[0];
        if (requirement) {
          requirement = {...newRequirement};
        } else {
          job.requirements.push(newRequirement);
        }
        return output;
      });
      return response.data;
    })
    .catch((e) => {
      console.log("*************Error Saving Job************");
      return e;
    });
  };

  function cancelRequirement(id) {
    //request that the server delete the Job
    console.log("enter cancelRequirement",id);
    return axios.delete(`/api/requirements/${id}`)
    .then(() => {
      let jobList = [...jobs];
      let job = jobList.filter((job) => {
        let requirement = job.requirements.filter((requirement) => id === requirement.id)[0];
        if (requirement) return true; else return false;
      })[0];
      job = {...job};
      console.log("before");
      for(const requirement of job.requirements){
        console.log(requirement.id);
      }
      let index = job.requirements.map((requirement) => requirement.id).indexOf(id);
      job.requirements.splice(index, 1);
      console.log("after");
      for(const requirement of job.requirements){
        console.log(requirement.id);
      }
      setJobs(jobList)
    })
    .catch((e) => {
      console.log("*************Error Deleting Job************");
      return e;
    });
  };

  return {
    jobs,
    calendar,
    addChangeJob,
    cancelJob,
    addChangeRequirement,
    cancelRequirement,
    addChangeAssignment,
    cancelAssignment,
  };
};


