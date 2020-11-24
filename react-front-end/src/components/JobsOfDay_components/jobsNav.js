import React from 'react';
import {Paper, ButtonGroup} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(60),
      height: theme.spacing(30),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function JobsNav(props) {
  const classes = useStyles();
  const totalHrs = props.jobObj.estimate_total_time / props.jobObj.estimate_total_workers;
  
  return ( 
    <Grid container spacing={1} >
      <Grid item xs={12}>
          <Paper className={classes.paper}>Job {props.id + 1}:  {props.jobObj.estimate_total_workers} workers, {props.jobObj.estimate_total_time} p-hrs. Total: {totalHrs} hrs</Paper>
      </Grid>
      <Grid align="center" item xs={12} >
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button color="secondary" 
            // onClick={}
          >
            Cancel</Button>
          <Button color="primary">Edit</Button>
          <Button color="default">Details</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
    
  )
}