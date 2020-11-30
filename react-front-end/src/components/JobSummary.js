import {Typography, Collapse, Box, Divider, Paper, Button, ButtonGroup, Grid} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerInfo from './JobSummary_components/customer_info';
import Requirements from './JobSummary_components/requirements';
import Estimates from './JobSummary_components/estimates';
import QuoteNotes from './JobSummary_components/quote_notes';
import Assignments from './JobSummary_components/assignments';
import {useState} from 'react';

const useStyles = makeStyles({
  paper: {
    marginTop: 20,
    marginBottom: 20,
    marginRight:10,
    marginLeft:10,
    padding: 20,
    height: "82vh",
  },
  title: {
    marginBlock:10,
  }
 
});

export default function JobSummary(props) {
  const classes = useStyles();
  const {setNewJob, transition} = props.toolChest;

  const onEdit = function() {
    setNewJob(false);
    transition(props.edit);
  };
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  
  return (
    <main>
      <Paper elevation={4} className={classes.paper}>
        <Box m={2}>
          <Typography variant="h5" className={classes.title}>{props.job.name}</Typography>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color="primary" onClick={props.onAllJobs}>Back</Button>
            <Button color="secondary" onClick={handleClick}>Delete</Button>
            <Button onClick={onEdit} color="default">Edit</Button>            
          </ButtonGroup>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Paper onClick={handleClick}>
              <Box m={1}>
              <Grid>
                <Box m={1}>
                <Grid>
                  Delete this job? 
                </Grid>
                </Box>
                <Grid>
                  <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                    <Button color="primary" variant="outlined">Cancel</Button>
                    <Button 
                      color="secondary" 
                      variant="outlined" 
                      onClick={() => {props.toolChest.cancelJob(props.toolChest.selectedJob)}} 
                      >Delete</Button>            
                  </ButtonGroup>
                </Grid>
              </Grid>
              </Box>
            </Paper>
          </Collapse>
        </Box> 
        <QuoteNotes job={props.job}/> 
        <Divider />
        <CustomerInfo job={props.job}/>
        <Divider/>
        <Estimates job={props.job}/>
        <Divider/>
        <Requirements job={props.job}/>
        <Divider/>
        <Assignments job={props.job}/>
      </Paper>
    </main>
  )
}
