
import {Box, Divider, Paper} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { useEffect, useState } from 'react';
import JobsNav from './jobsNav';
import RequirementsList from './requirementsList';


export default function JobItem({toolChest, details, edit, job, index}) {
  const {transition, setSelectedJob, newJob, setNewJob} = toolChest;
  const {trigger, setTrigger} = useState(false);

  useEffect(() => {
    if (trigger){
      transition(edit);
    }
  }, [newJob])
  
  const onDetails = function() {
    if (toolChest.job.id === job.id) {
      transition(details);
    } else {
      setSelectedJob(job.id);
    }
  }

  const onEdit = function() {
    if (toolChest.job.id === job.id) {
      setTrigger(true)
      setNewJob(false);
      console.log("setting new Job: false in JobItem")
    } else {
      toolChest.setTransitionTo(edit);
      setSelectedJob(job.id);
    }
  }

  return (
    <Paper variant="outlined">
        <ListItem>
          <Box>
            <JobsNav 
              jobObj={job} 
              id={index}
              toolChest={toolChest}
              onDetails={onDetails}
              onEdit={onEdit}
            />
            <RequirementsList  jobObj={job}/> 
            <Divider />
          </Box>
        </ListItem>
    </Paper>
  )
}