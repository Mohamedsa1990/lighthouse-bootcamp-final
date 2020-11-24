import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import CallIcon from '@material-ui/icons/Call';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function CustomerInfo(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" >
          <Typography color="textPrimary" >Customer Information</Typography>
        </ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemText primary="Name:" 

        secondary={props.jobs[0].customer_first_name + " " + props.jobs[0].customer_last_name}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested}>
            <ListItemIcon>
              <CallIcon color="primary"/>
            </ListItemIcon>

            <ListItemText primary="Phone:" secondary={props.jobs[0].customer_phone_number} />
          </ListItem>
          <ListItem className={classes.nested}>
            <ListItemIcon>
              <AlternateEmailIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Email:" secondary={props.jobs[0].customer_email} />        
          </ListItem>
          <ListItem className={classes.nested}>
            <ListItemIcon>
              <LocationOnIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Location:" secondary={props.jobs[0].customer_address + ", " + props.jobs[0].customer_city}/>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
