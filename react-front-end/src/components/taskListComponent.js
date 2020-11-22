import React from 'react';
import {Chip, Grid, Paper, Typography} from '@material-ui/core';

export default function TaskListComponent (props) {
  const tasks = props.tasks.map(task => {
    return (
      <Grid item>
        <Paper>
          <Grid container style={{padding:'0.8rem'}}>
            <Grid item xs={4} align="left">
              {task.name}
            </Grid>
            <Grid item xs={4} align="center">
              {(task.time)/60}
            </Grid>
            <Grid item xs={4} align="right">
              <Chip
              size="small"
              color="primary"
              label={task.difficulty}
              />
            </Grid>
          </Grid>
          <Typography style={{padding:'0.8rem'}} align="left">{task.description}</Typography>
        </Paper>
      </Grid>  
    );
  });
  return tasks;
};