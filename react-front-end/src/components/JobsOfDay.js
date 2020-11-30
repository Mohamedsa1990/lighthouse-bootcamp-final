import { Container, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Header from './JobsOfDay_components/header';
import JobItem from './JobsOfDay_components/JobItem';
import {useState} from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';

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
  container: {
    maxHeight: 400,
  },
}));

export default function JobsOfDay({details, edit, onNewJob, toolChest}) {
  const classes = useStyles();
  const {day} = toolChest;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const jobsPerDay = day.map((job, index) => {
    return [
    <JobItem
      key={index}
      toolChest={toolChest}
      details={details}
      edit={edit}
      job={job}
      index={index}
    />
    ]
  });
  console.log("jobsPerDay:", jobsPerDay);
  return (
    <main className={classes.root}>
      <Container >
        <Paper elevation={4} >
          <Header onNewJob={onNewJob} selectDay={toolChest.selectDay}/> 
          <TableContainer className={classes.container}>
            <List 
              aria-labelledby="nested-list-subheader"        
            >
            {jobsPerDay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)} 
            </List>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[4, 8, 12]}
            component="div"
            count={jobsPerDay.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Container>
    </main>
  )
}
