import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import { Typography,TextField } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function AssignWorker({requirements, users, checkedEmployee, setCheckedEmployee, start, end, setStart, setEnd}) {
  const classes = useStyles();
  // const filteredUsers = function (employees , skills){
  //   if (skills.length === 0) {
  //     return employees
  //   } else {
  //     skills.forEach(skill => {
  //       return 
  //     }
  //     )
  //   }
  // }
  const filter = users.filter(user => user.task_id === requirements[0].task_id);
  // console.log(filter)
  // console.log(requirements)
  // console.log(users)

  
  const handleToggle = (value) => () => {
    const currentIndex = checkedEmployee.map(e => e.user_id).indexOf(value.user_id);
    const newChecked = [...checkedEmployee];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedEmployee(newChecked);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="left">
        Assign Worker
      </Typography>
      <Grid container>
      <Grid item xs={12} sm={6}>
          <TextField
            required
            id="datetime-local"
            label="Start"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={start}
            onChange={e => setStart(e.target.value)}
            />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="datetime-local"
            label="End"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            value={end}
            onChange={e => setEnd(e.target.value)}
            />
        </Grid>
        <List dense className={classes.root}>
        {filter.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value.user_id} button>
              <ListItemAvatar>
                <Avatar
                  alt={`${value.first_name[0]}`}
                  src={`/static/images/avatar/${value + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.first_name} ${value.last_name}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checkedEmployee.map(e => e.user_id).indexOf(value.user_id) !== -1}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
        </List>
      </Grid>
    </React.Fragment>
  );
}