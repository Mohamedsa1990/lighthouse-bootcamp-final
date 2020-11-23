import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TaskDialogComponent from './taskDialogComponent'
import TaskListComponent from './taskListComponent'
import {useFormik} from 'formik'


export default function Requirements({tasks, setTasks}) {
  const formik = useFormik({
    initialValues: {
      name: '',
      difficulty: '',
      worker: '',
      time: '',
      description: '',
    },
    onSubmit: (values, {resetForm}) => {
      setTasks([...tasks, values])
      resetForm({values: ''})
      setTaskDialogOpen(false);
    },
  });
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  const handleaTaskDialogOpen = () => {
    setTaskDialogOpen(true);
  }
  const handleTaskDialogClose = () => {
    setTaskDialogOpen(false);
  }
  const handleDelete = (name) => {
    const newTasks = [...tasks];
    setTasks([...newTasks.filter(t => t.name !== name)])
  }
  
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
        <Grid container spacing={2} direction="column" align="center">
          <TaskListComponent
          tasks={tasks}
          delete={handleDelete}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TaskDialogComponent 
          open={taskDialogOpen}
          handleClose= {handleTaskDialogClose}
          formik={formik}
        />
      </Grid>
    </React.Fragment>
  );
}