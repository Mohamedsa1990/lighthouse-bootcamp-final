import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TaskDialogComponent from './taskDialogComponent'
import TaskListComponent from './taskListComponent'
import {useFormik} from 'formik'
import { Paper, Button } from '@material-ui/core';


export default function Requirements({setTotalTime,setTotalWorker,totalTime,totalWorker , tasks, requirements, setRequirements, jobId, newJob, cancelRequirement}) {
  
  const [taskDialogOpen, setTaskDialogOpen] = useState(false)
  
  const formik = useFormik({
    initialValues: {
      job_id: jobId,
      task_id: '',
      difficulty: '',
      estimate_workers: '',
      estimate_time: '',
    },
    onSubmit: (values, {resetForm}) => {
      setRequirements([...requirements, values])
      resetForm({values: ''})
      setTaskDialogOpen(false);
    },
  });
  
  const sumWorker = function(array){
    let total = 0;
    for (let i = 0 ; i < array.length; i++) {
      total += array[i].estimate_workers;
    };
    return total;
  };
  const sumTime = function(array){
    let total = 0;
    for (let i = 0 ; i < array.length; i++) {
      total += array[i].estimate_time;
    }
    return total;
  } 
  useEffect(()=> {
    setTotalWorker(sumWorker(requirements));
    setTotalTime(sumTime(requirements));
  },[requirements])

  const handleaTaskDialogOpen = () => {
    setTaskDialogOpen(true);
  }
  const handleTaskDialogClose = () => {
    setTaskDialogOpen(false);
  }
  const handleDelete = (task_id) => {
    const newTasks = [...requirements];
    if(!newJob) {
      const deleteReq = requirements.filter(t => t.task_id === task_id);
      cancelRequirement(deleteReq[0].id); 
    }
    setRequirements([...newTasks.filter(t => t.task_id !== task_id)]);
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
          <Fab color="primary"  aria-label="add" size="small" onClick={handleaTaskDialogOpen}>
          <AddIcon />
          </Fab>
        </Grid>
        <Grid container spacing={3} direction="column" align="center">
          <TaskListComponent
          requirements={requirements}
          tasks={tasks}
          delete={handleDelete}
          />
        </Grid>
        <Grid container justify="space-around">
          <Paper>
            <Button variant="contained">Total Workers: {totalWorker}</Button>
            <Button variant="contained">Total Time: {totalTime} hrs</Button>
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TaskDialogComponent 
          open={taskDialogOpen}
          tasks={tasks}
          handleClose= {handleTaskDialogClose}
          formik={formik}
        />
      </Grid>
    </React.Fragment>
  );
}