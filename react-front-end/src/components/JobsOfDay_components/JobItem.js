
import {Box, Divider, Paper} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { useEffect, useState } from 'react';
import JobsNav from './jobsNav';
import RequirementsList from './requirementsList';


export default function JobItem({toolChest, details, edit, job, index}) {
  const {transition, setSelectedJob} = toolChest;
  const [makeTransition, setMakeTransition] = useState([false, edit])

  useEffect(() => {
    if(makeTransition){
      if(makeTransition[0]) {
        transition(makeTransition[1]);
      }
    }
  }, [toolChest.job]);
  
  const onDetails = function() {
    if (toolChest.job.id === job.id) {
      transition(edit);
    } else {
      setSelectedJob(job.id);
      setMakeTransition([true, details])
    }
  }


  const onEdit = function() {
    if (toolChest.job.id === job.id) {
      transition(edit);
    } else {
      setSelectedJob(job.id);
      setMakeTransition([true, edit])
    }
  }

  return (
    <Paper variant="outlined">
        <ListItem>
          <Box>
            <JobsNav 
              jobObj={job} 
              id={index}
              
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