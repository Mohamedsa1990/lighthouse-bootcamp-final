import {Box, Divider, Paper} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import JobsNav from './jobsNav';
import RequirementsList from './requirementsList';


export default function JobItem({toolChest, details, edit, job, index}) {
  const {transition, setSelectedJob} = toolChest;

  const onDetails = function() {
    setSelectedJob(job.id);
    transition(details);
  }

  const onEdit = function() {
    setSelectedJob(job.id);
    transition(edit);
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