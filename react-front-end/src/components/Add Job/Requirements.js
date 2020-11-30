import { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import TaskDialogComponent from './taskDialogComponent'
import TaskListComponent from './taskListComponent'
import {useFormik} from 'formik'
import { Paper, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 10,
    width: 'auto',
    maxWidth: 'auto',
    position: 'center',
    overflow: 'auto',
    maxHeight: '55vh',
  },
}));

export default function Requirements({setTotalTime,setTotalWorker,totalTime,totalWorker , tasks, requirements, setRequirements, jobId, newJob, cancelRequirement}) {
  const classes = useStyles();
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [selectableTasks, setSelectableTasks] = useState([]);
  
  useEffect(() => {
    let output = [];
    const requireTasks = requirements.map((requirement) => requirement.task_id);
    output = tasks.filter((task) => !requireTasks.includes(task.id));
    setSelectableTasks(output);
  }, [tasks, requirements])

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
    <>
      <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid item xs={10}>
          <Typography variant="h6" align="left">
            Requirement details
          </Typography>
        </Grid>
        <Grid item xs={2} >
          <Fab style={{color: "#fff", backgroundColor:"#80B98B"}} aria-label="add" size="small" onClick={handleaTaskDialogOpen}>
          <AddIcon />
          </Fab>
        </Grid>
        <Grid container spacing={3} direction="column" align="center">
          <List dense className={classes.root}>
            <ListItem  style={{marginLeft:10, marginRight:10}}>
            <TaskListComponent
            requirements={requirements}
            tasks={tasks}
            delete={handleDelete}
            />
            </ListItem>
          </List>
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
          tasks={selectableTasks}
          handleClose= {handleTaskDialogClose}
          formik={formik}
        />
      </Grid>
    </>
  );
}