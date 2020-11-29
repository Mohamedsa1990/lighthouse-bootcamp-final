import { Container, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Header from './JobsOfDay_components/header';
import JobItem from './JobsOfDay_components/JobItem';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      marginTop: theme.spacing(10),
      width: theme.spacing(75),
      height: theme.spacing(30),
    },
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
    <main className={classes.root}>
      <Container >
        <Paper elevation={4} >
          <Header onNewJob={onNewJob} selectDay={toolChest.selectDay}/> 
          <List 
            aria-labelledby="nested-list-subheader"
          >
            {jobsPerDay} 
          </List>
        </Paper>
      </Container>
    </main>
  )
}
