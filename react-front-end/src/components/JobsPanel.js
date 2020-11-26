import React, { Fragment } from 'react';
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
  const { mode, transition, back } = useVisualMode(
    JOBS_OF_DAY
    // props. ? JOBS_OF_DAY : EMPTY 
  );

  return (
    <Fragment>
      {mode === EMPTY && (
      <Empty onClick={() => transition(JOBS_OF_DAY)} />)}
      {mode === JOBS_OF_DAY && (
      <JobsOfDay 
        onDetails={() => transition(JOB_SUMMARY)}
        onEdit={() => transition(JOB_CREATOR)}
        onNewJob={() => transition(JOB_CREATOR)}
        jobsPerDay={props.jobsPerDay}
        selectDay={props.selectDay}
      />)}
      {mode === JOB_SUMMARY && (
      <JobSummary 
        jobs={props.jobs} 
        onNewJob={() => transition(JOB_CREATOR)} 
        onAllJobs={() => transition(JOBS_OF_DAY)}/>)}
      {mode === JOB_CREATOR && (
      <AddJob tasks={props.tasks} users={props.users} addChangeJob={props.addChangeJob} />)}
    </Fragment>
  );
}

