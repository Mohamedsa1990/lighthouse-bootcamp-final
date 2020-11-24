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

export default function QuoteNotes(props) {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Grid container spacing={3} >
        <Grid  item xs>
          <Paper elevetion={3} className={classes.paper} >
            <Typography color="textPrimary" component="span">Quote Notes: </Typography> 
            {props.jobs[0].notes}
          </Paper>
        </Grid>    
      </Grid>
    </div>
  );
}
