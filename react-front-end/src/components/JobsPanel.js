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

  useEffect(() => {
    if(mode === JOB_SUMMARY) {
      transition(JOBS_OF_DAY);
    }
  }, [props.toolChest.day])

  useEffect(() => {
    if(mode === JOB_SUMMARY || (mode === JOBS_OF_DAY)) {
      if(transitionTo === JOB_CREATOR){
        transition(JOB_CREATOR);
        setTransitionTo(undefined);
      } else if (mode !== JOB_SUMMARY){
        if (toolChest.selectedJob !== 0){
          transition(JOB_SUMMARY);
        }
      }
    }
  }, [props.toolChest.job])

  const onNewJob = function() {
    if (props.toolChest.job.id === 0) {
      transition(JOB_CREATOR);
    } else {
      setTransitionTo(JOB_CREATOR);
      props.toolChest.setSelectedJob(0);
    }
  };


  const toolChest = {...props.toolChest, mode, transition, back, setTransitionTo}
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
      <AddJob tasks={toolChest.tasks} users={toolChest.users} addChangeJob={toolChest.addChangeJob} />)}
    </Fragment>
  );
}

