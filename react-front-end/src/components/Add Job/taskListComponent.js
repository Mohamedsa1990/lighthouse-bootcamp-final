import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Chip, Grid, Paper, Typography, ButtonGroup, IconButton} from '@material-ui/core';


export default function TaskListComponent (props) {
  const requirements = props.requirements.map(requirement => {
    return (
      <Grid item key={requirement.task_id}>
        <Paper >
          <Grid container style={{padding:'0.8rem'}} justify="space-between" spacing={2}>
            <Grid item xs={3} align="left">
              {props.tasks.filter(task => task.id === requirement.task_id)[0].name}
            </Grid>
            <Grid item xs={3} align="center">
              Time: {requirement.estimate_time}
            </Grid>
            <Grid item xs={3} align="center">
              Workers: {requirement.estimate_workers}
            </Grid>
            <Grid item xs={3} align="right">
              <Chip
              size="small"
              color="primary"
              label={requirement.difficulty}
              />
            </Grid>
            <Grid item xs={10}>
            </Grid>
            <Grid item xs={2}>
              <ButtonGroup  aria-label="outlined primary button group" size="small">
                <IconButton></IconButton>
                <IconButton onClick={()=>{props.delete(requirement.task_id)}}><DeleteIcon color="secondary"/></IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Paper>
      </Grid>  
    );
  });
  return requirements;
};