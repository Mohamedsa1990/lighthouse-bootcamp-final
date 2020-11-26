import React from 'react';
import {Typography, Container, Box, Divider, Paper, Button, ButtonGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerInfo from './JobSummary_components/customer_info';
import Requirements from './JobSummary_components/requirements';
import Estimates from './JobSummary_components/estimates';
import QuoteNotes from './JobSummary_components/quote_notes';
import Assignments from './JobSummary_components/assignments';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(80),
      height: theme.spacing(30),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function JobSummary(props) {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Container>
        <Paper elevation={4} >
          <Box m={2}>
            <Typography variant="h5">Job Summary</Typography>
            <Typography variant="h6" >{props.job.assignments[0].starts} - {props.job.assignments[0].ends}</Typography>
            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              <Button color="secondary" onClick={props.onAllJobs}>All Jobs</Button>
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
      </Container>
    </main>
  )
}
