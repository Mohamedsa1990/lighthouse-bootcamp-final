import {useState} from 'react';
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
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function CustomerInfo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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

        secondary={props.job.customer_first_name + " " + props.job.customer_last_name}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.nested}>
            <ListItemIcon>
              <CallIcon color="primary"/>
            </ListItemIcon>

            <ListItemText primary="Phone:" secondary={props.job.customer_phone_number} />
          </ListItem>
          <ListItem className={classes.nested}>
            <ListItemIcon>
              <AlternateEmailIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Email:" secondary={props.job.customer_email} />        
          </ListItem>
          <ListItem className={classes.nested}>
            <ListItemIcon>
              <LocationOnIcon color="primary"/>
            </ListItemIcon>
            <ListItemText primary="Location:" secondary={props.job.customer_address + ", " + props.job.customer_city}/>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
