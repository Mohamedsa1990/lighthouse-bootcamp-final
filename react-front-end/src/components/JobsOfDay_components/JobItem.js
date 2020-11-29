
import {Box, Divider, Paper} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import JobsNav from './jobsNav';
import RequirementsList from './requirementsList';


export default function JobItem({toolChest, details, edit, job, index}) {
  const {transition, setSelectedJob, setNewJob} = toolChest;
  
  const onDetails = function() {
    if (toolChest.job.id === job.id) {
      transition(details);
    } else {
      setSelectedJob(job.id);
    }
  }

  const onEdit = function() {
    if (toolChest.job.id === job.id) {
      setNewJob(false);
      transition(edit);
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