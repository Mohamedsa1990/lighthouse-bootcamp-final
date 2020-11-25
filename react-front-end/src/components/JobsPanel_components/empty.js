import React from 'react';
import {Typography, Container, Box, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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

export default function Empty(props) {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Container>
        <Paper onClick={props.onClick} elevation={6} >
          <Box m={2}>
            <Typography variant="h5">Work Group App</Typography>
          </Box>
          
        </Paper>
      </Container>
    </main>
  )
}