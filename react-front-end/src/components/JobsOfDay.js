import { Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Header from './JobsOfDay_components/header';
import JobItem from './JobsOfDay_components/JobItem';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 20,
    marginBottom: 20,
    marginRight:10,
    marginLeft:10,
    padding: 20,
    height: "82vh",
  },
  root: {
    marginBlock: 20,
    width: '100%',
    maxWidth: 'auto',
    position: 'relative',
    overflow: 'auto',
    maxHeight: '75vh',
  },
}));

export default function JobsOfDay({details, edit, onNewJob, toolChest}) {
  const classes = useStyles();
  const {day} = toolChest;
  const jobsPerDay = day.map((job, index) => {
    return (
    <JobItem
      key={index}
      toolChest={toolChest}
      details={details}
      edit={edit}
      job={job}
      index={index}
    />
    )
  })
  return (
    <main >
        <Paper elevation={4} className={classes.paper} >
          <Header onNewJob={onNewJob} selectDay={toolChest.selectDay}/> 
          <List 
            dense className={classes.root}
            aria-labelledby="nested-list-subheader"
          >
            {jobsPerDay} 
          </List>
        </Paper>
    </main>
  )
}
