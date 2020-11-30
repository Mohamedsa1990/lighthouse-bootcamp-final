import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, Menu,MenuItem}  from '@material-ui/core'
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  subTitle: {
    marginLeft: 500,
    marginRight: 100,

  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {setFireNewJob} = props.toolChest;

  const onNewJob = function() {
    setFireNewJob(true);
    handleClose();
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" style={{backgroundColor: " #80B98B"}}>
        <Toolbar style={{height: 80}}>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={onNewJob}>Add Job</MenuItem>
            <NavLink to="/"><MenuItem onClick={onNewJob}>Logout</MenuItem></NavLink>
          </Menu>
          <Container>
            <Typography variant="h4" className={classes.title}>
              Greener Side Landscaping
            </Typography>
            <Typography variant="subtitle2" className={classes.subTitle}>
              A WorkSuite App
            </Typography>
          </Container>
          <Typography variant="h6" className={classes.menuButton}>
            Welcome: Admin
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}