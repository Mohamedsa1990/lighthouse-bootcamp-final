import React from 'react';
import Button from '@material-ui/core/Button'
import './Cover.css';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';


export default function LandingPage(){

  return (
    <motion.div 
    className={'Cover'}
    initial={{ y:-100, opacity:0}}
    animate={{ y: 0, opacity:1 }}
    transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
    }}
    >
      <NavLink to="/app">
        <Button variant="outlined" size={"large"} style={{color: "White", borderColor: "White", marginTop: "500px"}}>
          Get started
        </Button>
      </NavLink>
    </motion.div>
  );
}