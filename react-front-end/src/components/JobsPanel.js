import React, { Fragment, useEffect, useState } from 'react';
import useVisualMode from '../hooks/useVisualMode'
import Empty from './JobsPanel_components/empty';
import JobsOfDay from './JobsOfDay';
import JobSummary from './JobSummary';
import AddJob from './Add Job/AddJob';

const EMPTY = "EMPTY";
const JOBS_OF_DAY = "JOBS_OF_DAY";
const JOB_SUMMARY = "JOB_SUMMARY";
const JOB_CREATOR ="JOB_CREATOR"; 

export default function JobsPanel(props) {
  const { mode, transition, back } = useVisualMode(JOBS_OF_DAY);
  const [transitionTo, setTransitionTo] = useState(undefined);
  const [newJob, setNewJob] = useState(true);
  const {day, job, selectedJob, setSelectedJob, calendarSelectDay, calendarSelectJob, setCalendarSelectDay, setCalendarSelectJob} = props.toolChest;
  

  useEffect(() => {
    if(mode === JOB_SUMMARY) {
      transition(JOBS_OF_DAY);
      setCalendarSelectDay(false);
    }
  }, [day, calendarSelectDay])

  useEffect(() => {
    if(mode === JOB_SUMMARY || (mode === JOBS_OF_DAY)) {
      if(transitionTo === JOB_CREATOR){
        transition(JOB_CREATOR);
        setNewJob(false);
        console.log("setting newJob false in Job Pannel")
        setTransitionTo(undefined);
      } else if (mode !== JOB_SUMMARY){
        if (selectedJob !== 0){
          transition(JOB_SUMMARY);
          setCalendarSelectJob(false);
        } 
      }
    }
  }, [job, calendarSelectJob])

  const onNewJob = function() {
    if (job.id === 0) {
      transition(JOB_CREATOR);
    } else {
      setSelectedJob(0);
      transition(JOB_CREATOR)
    }
  };

  const toolChest = {...props.toolChest, mode, transition, back, setTransitionTo, newJob, setNewJob}
  return (
    <Fragment>
      {mode === EMPTY && (
      <Empty onClick={() => transition(JOBS_OF_DAY)} />)}
      {mode === JOBS_OF_DAY && (
      <JobsOfDay 
        details={JOB_SUMMARY}
        edit={JOB_CREATOR}
        onNewJob={onNewJob}
        toolChest={toolChest}
      />)}
      {mode === JOB_SUMMARY && (
      <JobSummary 
        job={toolChest.job} 
        onNewJob={onNewJob} 
        onAllJobs={() => transition(JOBS_OF_DAY)}/>)}
      {mode === JOB_CREATOR && (
      <AddJob 
      tasks={toolChest.tasks} 
      users={toolChest.users} 
      addChangeJob={toolChest.addChangeJob} 
      addChangeAssignment={toolChest.addChangeAssignment} 
      addChangeRequirement={toolChest.addChangeRequirement} 
      cancelJob={toolChest.cancelJob}
      cancelRequirement={toolChest.cancelRequirement}
      cancelAssignment={toolChest.cancelAssignment}
      jobInfo={toolChest.job}
      onAllJobs={() => transition(JOBS_OF_DAY)} 
      newJob={toolChest.newJob}
      setNewJob={toolChest.setNewJob}
      />)}
    </Fragment>
  );
}

