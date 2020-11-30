import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button'
import './Cover.css';
import { Link } from 'react-router-dom';

export default function LandingPage(){

  return (
    <div className={'Cover'}>
      <Link to="/app">
        <Button variant="outlined" size={"large"} style={{color: "White", borderColor: "White", marginTop: "500px"}}>
          Get started
        </Button>
      </Link>
    </div>
  );
}