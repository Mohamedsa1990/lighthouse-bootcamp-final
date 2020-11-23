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
import { Typography } from '@material-ui/core'


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

export default function AssignWorker({checkedEmployee, setCheckedEmployee}) {
  const classes = useStyles();
  const users = [{
    id:1,
    first_name:"John",
    last_name:"Doe",
    admin:false
  },{
    id:2,
    first_name:"James",
    last_name:"Morgan",
    admin:false
  },{
    id:3,
    first_name:"Dan",
    last_name:"Smith",
    admin:false
  },{
    id:3,
    first_name:"Dan",
    last_name:"Smith",
    admin:false
  },{
    id:3,
    first_name:"Dan",
    last_name:"Smith",
    admin:false
  },{
    id:3,
    first_name:"Dan",
    last_name:"Smith",
    admin:false
  },{
    id:3,
    first_name:"Dan",
    last_name:"Smith",
    admin:false
  },{
    id:3,
    first_name:"Dan",
    last_name:"Smith",
    admin:false
  }]
  
  
  const handleToggle = (value) => () => {
    const currentIndex = checkedEmployee.map(e => e.id).indexOf(value.id);
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
        <List dense className={classes.root}>
        {users.map((value) => {
          const labelId = `checkbox-list-secondary-label-${value}`;
          return (
            <ListItem key={value.id} button>
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