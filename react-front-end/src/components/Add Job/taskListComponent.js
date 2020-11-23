import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Chip, Grid, Paper, Typography, ButtonGroup, IconButton} from '@material-ui/core';


export default function TaskListComponent (props) {
  const tasks = props.tasks.map(task => {
    return (
      <Grid item key={task.name}>
        <Paper >
          <Grid container style={{padding:'0.8rem'}} justify="space-between" spacing={2}>
            <Grid item xs={3} align="left">
              {task.name}
            </Grid>
            <Grid item xs={3} align="center">
              Time: {task.time}
            </Grid>
            <Grid item xs={3} align="center">
              Workers: {task.worker}
            </Grid>
            <Grid item xs={3} align="right">
              <Chip
              size="small"
              color="primary"
              label={task.difficulty}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography >{task.description}</Typography>
            </Grid>
            <Grid item xs={9}>
            </Grid>
            <Grid item xs={3}>
              <ButtonGroup  aria-label="outlined primary button group" size="small">
                <IconButton></IconButton>
                <IconButton onClick={()=>{props.delete(task.name)}}><DeleteIcon color="secondary"/></IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Paper>
      </Grid>  
    );
  });
  return tasks;
};