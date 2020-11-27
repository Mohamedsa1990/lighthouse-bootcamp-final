import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { Grid } from '@material-ui/core';
import { Typography,TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 600,
    flexWrap: 'wrap',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AssignWorker({requirements, users, start, end, setStart, setEnd, assignments, setAssignments, jobId}) {
  
  const classes = useStyles();
  const [checkedEmployee, setCheckedEmployee] = useState([]);
  const jobSkills = requirements.map(requirement => requirement.task_id)
  const filteredUsers = function (users, jobSkills) {
    const userAccum = [];
    users.forEach (user => {
      user.skills.forEach(skill => {
        if (jobSkills.includes(skill.task_id)) {
          userAccum.push(user)
        }
      })
    })
    return userAccum;
  } 
  
  const userList = filteredUsers(users,jobSkills)

  const usersWithoutDuplicate = userList.filter((item, index) => userList.indexOf(item) === index)

  const handleToggle = (value) => () => {
    const currentIndex = checkedEmployee.map(e => e.id).indexOf(value.id);
    const newAssigned = [...assignments]
    const newChecked = [...checkedEmployee];

    if (currentIndex === -1) {
      newChecked.push(value);
      newAssigned.push({job_id: jobId, user_id: value.id, starts: start, ends: end});

    } else {
      newChecked.splice(currentIndex, 1);
      newAssigned.splice(currentIndex, 1);
    }
    setAssignments(newAssigned);
    setCheckedEmployee(newChecked);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom align="left">
        Assign Worker
      </Typography>
      <Grid container justify="space-between">
      <Grid item xs={12} sm={5}>
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
        <Grid item xs={12} sm={5}>
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
        {usersWithoutDuplicate.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value.id} button >
              <ListItemAvatar>
                <Avatar
                  alt={`${value.first_name[0]}`}
                  src={value.avatar}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.first_name} ${value.last_name}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={handleToggle(value)}
                  checked={checkedEmployee.map(e => e.id).indexOf(value.id) !== -1}
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