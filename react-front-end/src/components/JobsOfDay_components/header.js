import {Typography} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(60),
      height: theme.spacing(30),
    },
  },
}));

export default function Header({selectDay, onNewJob}) {
  const classes = useStyles();

  const selectDayString = selectDay.starts.toString();


  return (
    <Grid container spacing={3} >
      <Grid item xs>
        <Typography variant="h6" >{selectDayString.slice(0, 16)}</Typography>
      </Grid>
      <Grid item xs>  
        <Button
          variant="outlined"
          color="primary"
          onClick={onNewJob}
          className={classes.button}
        >
          New Job
        </Button>
      </Grid>
    </Grid>
  )
}