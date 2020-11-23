import React from 'react';
import {Button, Typography, Container, Box, Divider, Paper} from '@material-ui/core';
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
          <QuoteNotes />
          <Divider />
          <CustomerInfo/>
          <Divider/>
          <Estimates m={2}/>
          <Divider/>
          <Box mt={2} ml={2}>
            <Typography align="left">Requirements:</Typography>
          </Box>
          <Requirements/>
          <Divider/>
          <Box mt={2} ml={2}>
            <Typography align="left">Assignments:</Typography>
          </Box>
          <Assignments />
        </Paper>
      </Container>
    </main>
  )
}