import { Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Header from './JobsOfDay_components/header';
import JobItem from './JobsOfDay_components/JobItem';
import {useState} from 'react';
import TablePagination from '@material-ui/core/TablePagination';
import TableContainer from '@material-ui/core/TableContainer';

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
  container: {
    maxHeight: 700,
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
  return (
    <main >
        <Paper elevation={4} className={classes.paper} >
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
          {/* <List 
            dense className={classes.root}
            aria-labelledby="nested-list-subheader"
          >
            {jobsPerDay} 
          </List> */}
        </Paper>
    </main>
  )
}
