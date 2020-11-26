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
  //jobsPerDay={day} selectDay={selectDay} jobs={jobs} job={job}
  const { mode, transition, back } = useVisualMode(
    JOBS_OF_DAY
    // props. ? JOBS_OF_DAY : EMPTY 
  );
  const toolChest = {...props.toolChest, mode, transition, back}
  return (
    <Fragment>
      {mode === EMPTY && (
      <Empty onClick={() => transition(JOBS_OF_DAY)} />)}
      {mode === JOBS_OF_DAY && (
      <JobsOfDay 
        details={JOB_SUMMARY}
        edit={JOB_CREATOR}
        newJob={JOB_CREATOR}
        toolChest={toolChest}
      />)}
      {mode === JOB_SUMMARY && (
      <JobSummary 
        job={toolChest.job} 
        onNewJob={() => transition(JOB_CREATOR)} 
        onAllJobs={() => transition(JOBS_OF_DAY)}/>)}
      {mode === JOB_CREATOR && (
      <AddJob tasks={toolChest.tasks} users={toolChest.users} addChangeJob={toolChest.addChangeJob} />)}
    </Fragment>
  );
}

