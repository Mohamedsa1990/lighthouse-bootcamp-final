import React from 'react';
import Button from '@material-ui/core/Button'
import './Cover.css';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import logoImg from '../wslogo.png';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    minWidth: "100vw",
    minHeight: "100vh",
    backgroundColor: "transparent",
  },
  media: {
    width: 300,
    height: 181,
  },
});

export default function LandingPage(){
  const classes = useStyles();

  return (
    <motion.div 
    className={'Cover'}
    initial={{ y:-100, opacity:0}}
    animate={{ y: 0, opacity:1 }}
    transition={{
    type: "spring",
    stiffness: 260,
    damping: 20,
    }}
    >      
      <Card 
        className={classes.card}        
        style={{ backgroundColor: 'rgba(0,0,0,.3)'}}
      > 
      <Container align="center">        
        <CardMedia
          className={classes.media}
          component="img"
          alt="WS logo"              
          title="WS logo"
          image={logoImg} 
          style={{marginTop: "380px"}}          
        /> 
        </Container>      
      <NavLink to="/app">
        <Button variant="outlined" size={"large"} style={{color: "White", borderColor: "White", marginTop: "10px"}}>
          Get started
        </Button>
      </NavLink>
      </Card>
    </motion.div>
  );
}