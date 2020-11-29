import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const columns = [
  { id: 'tasks', label: 'Tasks', minWidth: 50, maxWidth: 100},
  { id: 'workers', label: 'Workers', minWidth: 10, maxWidth: 30, align: 'center' },
  {
    id: 'time_quoted',
    label: 'Time\u00a0Quoted\u00a0(hrs)',
    minWidth: 10, 
    maxWidth: 30,
    align: 'center',
  },
  {
    id: 'difficulty',
    label: 'Difficulty',
    minWidth: 10, 
    maxWidth: 30,
    align: 'center',
  },
];

function createData(tasks, workers, time_quoted, difficulty) {
  return { tasks, workers, time_quoted, difficulty };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    maxHeight: 250,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function RequirementsList(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const requirementsArray = props.jobObj.requirements;
  
  const rows = requirementsArray.map((obj) => {
    return createData(obj.name, obj.estimate_workers, obj.estimate_time, obj.difficulty)
  });

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}      
    >
      <ListItem key={0}  button onClick={handleClick}>
        <ListItemText  primary="Requirements" />
        {open ? <ExpandLess /> : <ExpandMore  />}
      </ListItem>
      <Collapse key={1}  in={open} timeout="auto" unmountOnExit>
        <Paper   className={classes.root}>
          <TableContainer className={classes.container}>
            <Table  size="small" stickyHeader aria-label="sticky table">
              <TableHead >
                <TableRow >
                  {columns.map((column, index) => (                    
                    <TableCell
                      key={index}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rIndex) => {
                  return (
                    <TableRow key={rIndex} hover role="checkbox" tabIndex={-1}>
                      {columns.map((column, cIndex) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={`${cIndex} ${rIndex}`} align={column.align}>
                            {column.format && typeof value === 'number' ? column.format(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </Collapse>
    </List>  
  );
}
