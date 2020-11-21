import React from 'react';
import {Button, Typography, Container, Box, Divider, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CustomerInfo from './JobSummary_components/customer_info';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    // '& > *': {
    //   margin: theme.spacing(1),
    //   width: theme.spacing(30),
    //   height: theme.spacing(30),
    // },
  },
}));

export default function JobSummary(props) {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Container>
      <Paper elevation={4} >
        <Box m={2}>
          <Typography variant="h4">Job Summary</Typography>
        </Box>
        <Box m={2}>
          <Typography>Quote Notes:</Typography>
        </Box>
        <Divider/>
        <CustomerInfo/>
        <Box mt={3}>
          <Button color="primary">Press me</Button>
        </Box>
        <Divider/>
      <section>
        Customer Information
      </section>
      <section>
        Estimates
      </section>
      <section>
        Requirements
      </section>
      <section>
        Assignments
      </section>
      
      </Paper>
      </Container>
    </main>
  )
}