import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Chip, Grid, Paper, Typography, ButtonGroup, IconButton} from '@material-ui/core';
import {Box, Collapse, Button} from '@material-ui/core'

export default function TaskListComponent (props) {
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const requirements = props.requirements.map(requirement => {
  const handleOpen = () => {
    setDropDownOpen(!dropDownOpen);
    console.log('inside the handle')
  };
  console.log(dropDownOpen)
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
              variant="outlined"
              label={requirement.difficulty}
              />
            </Grid>
            <Grid item xs={10}>
            </Grid>
            <Grid item xs={2}>
              <ButtonGroup  aria-label="outlined primary button group" size="small">
                <IconButton></IconButton>
                <IconButton onClick={handleOpen}><DeleteIcon color="secondary" /></IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
          <Collapse in={dropDownOpen} timeout="auto" unmountOnExit>
            <Box m={1}>
            <Grid>
              <Box m={1}>
              <Grid>
                Delete this requirement? 
              </Grid>
              </Box>
              <Grid>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                  <Button color="primary" variant="outlined" onClick={handleOpen}>Cancel</Button>
                  <Button color="secondary" variant="outlined" onClick={()=> {props.delete(requirement.task_id)}}>Delete</Button>            
                </ButtonGroup>
              </Grid>
            </Grid>
            </Box>
          </Collapse>
        </Paper>
      </Grid>  
    );
  });
  return requirements;
};