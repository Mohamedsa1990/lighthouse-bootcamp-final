import {Typography, Container, Box, Divider, Paper, Button, ButtonGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerInfo from './JobSummary_components/customer_info';
import Requirements from './JobSummary_components/requirements';
import Estimates from './JobSummary_components/estimates';
import QuoteNotes from './JobSummary_components/quote_notes';
import Assignments from './JobSummary_components/assignments';

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
  }

  return (
    <main>
      <Paper elevation={4} className={classes.paper}>
        <Box m={2}>
          <Typography variant="h5" className={classes.title}>{props.job.name}</Typography>
          <ButtonGroup variant="outlined" aria-label="outlined primary button group">
            <Button color="secondary" onClick={props.onAllJobs}>Back</Button>
            <Button onClick={onEdit} color="default">Edit</Button>
            <Button onClick={props.onNewJob} color="primary">New Job</Button>
          </ButtonGroup>
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
