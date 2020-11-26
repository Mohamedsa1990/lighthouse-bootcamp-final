import React from 'react';
import {Paper, ButtonGroup, Collapse, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(60),
      height: theme.spacing(30),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function JobsNav(props) {
  const classes = useStyles();
  const totalHrs = props.jobObj.estimate_total_time / props.jobObj.estimate_total_workers; 
  
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return ( 
    <Grid container spacing={1} >
      <Grid item xs={12}>
          <Paper className={classes.paper}>Job {props.id + 1}:  {props.jobObj.estimate_total_workers} workers, {props.jobObj.estimate_total_time} p-hrs. Total: {totalHrs} hrs</Paper> 
      </Grid>
      <Grid align="center" item xs={12} >
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button color="secondary" onClick={handleClick}>Delete</Button>
          <Button onClick={props.onEdit} color="primary">Edit</Button>
          <Button onClick={props.onDetails} color="default">Details</Button>
        </ButtonGroup>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Paper>
            <Box m={1}>
            <Grid>
              <Box m={1}>
              <Grid>
                Delete this job? 
              </Grid>
              </Box>
              <Grid>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                  <Button color="primary" variant="outlined" onClick={handleClick}>Cancel</Button>
                  <Button color="secondary" variant="outlined">Delete</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
            </Box>
          </Paper>
        </Collapse>
      </Grid>
    </Grid>
  )
}