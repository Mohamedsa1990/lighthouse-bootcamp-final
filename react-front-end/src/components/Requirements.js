import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Divider from '@material-ui/core/Divider';
import TaskDialogComponent from './taskDialogComponent'
import TaskListComponent from './taskListComponent'

export default function Requirements() {
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const handleaTaskDialogOpen = () => {
    setTaskDialogOpen(true);
  }
  const handleTaskDialogClose = () => {
    setTaskDialogOpen(false);
  }

  const [tasks, setTasks] = useState([
    {
      id:1,
      name:"Lawn Mowing1",
      difficulty: "Med",
      time: 240,
      description: "lorem ipsum Hello world"
    },
    {
      id:2,
      name:"Lawn Mowing2",
      difficulty: "Low",
      time: 180,
      description: "lorem ipsum Hello world"
    },
    {
      id:3,
      name:"Lawn Mowing3",
      difficulty: "High",
      time: 120,
      description: "lorem ipsum Hello world"
    },
  ]);
  return (
    <React.Fragment>
      <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h6" align="left">
            Requirement details
          </Typography>
        </Grid>
        <Grid item >
          <Fab color="primary" aria-label="add" size="small" onClick={handleaTaskDialogOpen}>
          <AddIcon />
          </Fab>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid container spacing={2} direction="column" align="center">
          <TaskListComponent
          tasks={tasks}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TaskDialogComponent 
          open={taskDialogOpen}
          handleClose= {handleTaskDialogClose}
        />
      </Grid>
    </React.Fragment>
  );
}