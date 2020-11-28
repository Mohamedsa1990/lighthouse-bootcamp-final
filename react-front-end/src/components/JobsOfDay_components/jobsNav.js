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
  const totalHrs = Math.round((props.jobObj.estimate_total_time / props.jobObj.estimate_total_workers) * 100) / 100; 
  
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  
  
  return ( 
    <Grid container spacing={1} >
      <Grid item xs={12}>
          <Paper className={classes.paper}>{props.jobObj.name}:  {props.jobObj.estimate_total_workers} workers, {props.jobObj.estimate_total_time} p-hrs. Total: {totalHrs} hrs</Paper> 
      </Grid>
      <Grid align="center" item xs={12} >
        <ButtonGroup variant="outlined" aria-label="outlined primary button group">
          <Button color="secondary" onClick={handleClick}>Delete</Button>
          <Button onClick={props.onEdit} color="default">Edit</Button>
          <Button onClick={props.onDetails} color="primary">Details</Button>
        </ButtonGroup>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Paper onClick={handleClick}>
            <Box m={1}>
            <Grid>
              <Box m={1}>
              <Grid>
                Delete this job? 
              </Grid>
              </Box>
              <Grid>
                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                  <Button color="primary" variant="outlined">Cancel</Button>
                  <Button color="secondary" variant="outlined" onClick={() => {props.toolChest.cancelJob(props.jobObj.id)}} >Delete</Button>            
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