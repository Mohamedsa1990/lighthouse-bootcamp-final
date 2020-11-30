import React from 'react';
import App from './App';
import LandingPage from './components/Cover'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function Pages() {
  return(
    <AnimatePresence>
      <Router>
        <Route path='/app' exact component={App}/>
        <Route path='/' exact component={LandingPage}/>
      </Router>
    </AnimatePresence>
  );
};