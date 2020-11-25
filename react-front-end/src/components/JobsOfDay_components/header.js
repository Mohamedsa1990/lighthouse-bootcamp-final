import React from 'react';
import {Typography, Container, Box, Divider, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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

export default function Header(props) {
  const classes = useStyles();

  return (
    <Grid container spacing={3} >
      <Grid item xs>
        <Typography variant="h6" >Monday, January 8</Typography>
      </Grid>
      <Grid item xs>  
        <Button
          variant="outlined"
          color="primary"
          onClick={props.onNewJob}
          className={classes.button}
        >
          New Job
        </Button>
      </Grid>
    </Grid>
  )
}