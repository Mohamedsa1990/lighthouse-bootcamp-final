import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));

const estimatesData = {
  time: "4 hrs",
  workers: 4
}

export default function Estimates() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Grid container spacing={3} >
        <Grid  item xs>
          <Paper className={classes.paper}>
            <Typography color="textPrimary" component="span">Time Estimate: </Typography>
            {estimatesData.time}
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography color="textPrimary" component="span">Required Workers: </Typography>
            {estimatesData.workers}
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
