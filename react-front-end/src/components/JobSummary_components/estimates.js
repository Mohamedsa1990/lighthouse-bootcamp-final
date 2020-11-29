import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
}));


export default function Estimates(props) {
  const classes = useStyles();
  
  return (
    <div className={classes.root} >
      <Grid container spacing={3} >
        <Grid  item xs>
          <Paper className={classes.paper}>
            <Typography color="textPrimary">Time Estimate: </Typography>
            <Typography align="right"> {props.job.estimate_total_time} p-hrs</Typography>
          </Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>
            <Typography color="textPrimary" >Required Workers: </Typography>
            <Typography align="right">{props.job.estimate_total_workers}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
