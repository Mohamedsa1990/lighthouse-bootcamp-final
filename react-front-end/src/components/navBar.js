import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Container, Menu,MenuItem}  from '@material-ui/core'
import { NavLink } from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import logoImg from '../landlogow.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    maxWidth: 300,
    backgroundColor: "transparent",
  },
  subTitle: {
    marginLeft: 500,
    marginRight: 100,
  },
  card: {
    flexGrow: 1,
    maxWidth: 550,
    backgroundColor: "transparent",
  },
  media: {
    flexGrow: 1,
    width: "40%",
    height: 70,
    align: "center"
  },
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
      <AppBar position="static" style={{backgroundColor: "#80B98B"}}>
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
            <MenuItem onClick={onNewJob} style={{fontSize: "0.85em"}}>Add Job</MenuItem>
            <NavLink to="/"><MenuItem onClick={onNewJob} style={{fontSize: "0.85em"}}>Logout</MenuItem></NavLink>
          </Menu>
          <Container align="center" >            
              <CardMedia
                className={classes.media}
                component="img"
                alt="WS logo"              
                title="WS logo"
                image={logoImg}           
              />            
          </Container>
          <Typography variant="h6" className={classes.menuButton} style={{fontSize: "1em"}}>
            Welcome: Admin
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}