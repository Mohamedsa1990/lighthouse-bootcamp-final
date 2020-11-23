import React from 'react';
import {Typography, Container, Box, Divider, Paper} from '@material-ui/core';
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
      width: theme.spacing(60),
      height: theme.spacing(30),
    },
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
          </Box>
          <QuoteNotes jobs={props.jobs}/>
          <Divider />
          <CustomerInfo jobs={props.jobs}/>
          <Divider/>
          <Estimates jobs={props.jobs}/>
          <Divider/>
          <Requirements jobs={props.jobs}/>
          <Divider/>
          <Assignments jobs={props.jobs}/>
        </Paper>
      </Container>
    </main>
  )
}