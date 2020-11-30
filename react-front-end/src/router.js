import React from 'react';
import App from './App';
import LandingPage from './components/Cover'
import { Route, BrowserRouter as Router } from 'react-router-dom';

export default function Pages() {
  return(
    <Router>
      <Route path='/' exact component={LandingPage}/>

      <Route path='/app' exact component={App}/>

    </Router>
  );
};