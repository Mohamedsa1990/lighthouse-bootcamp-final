import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import axios from 'axios'

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

const notesData = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"

const fetchNotesData = () => {
  axios.get('/api/jobsummary')
  .then((res) => {
    console.log("fetchNotesData: ", res.data)
  })
};

fetchNotesData();

export default function QuoteNotes() {
  const classes = useStyles();

  return (
    <div className={classes.root} >
      <Grid container spacing={3} >
        <Grid  item xs>
          <Paper elevetion={3} className={classes.paper} >
            <Typography color="textPrimary" component="span">Quote Notes: </Typography> 
            {notesData}
          </Paper>
        </Grid>    
      </Grid>
    </div>
  );
}

// from express/... server.js
// App.get('/api/jobsummary', (req, res) => {
//   db.query ("SELECT * FROM jobs WHERE id = 1")
//   .then(data => {
//     res.json(data.rows)
//     // return res.json(data.rows)
//   })
// });