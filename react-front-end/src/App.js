import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import 'fontsource-roboto';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';

// import moment from 'moment'
// import Paper from '@material-ui/core/Paper';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

// const events = [{
//   id: 0,
//   title: 'All Day Event very long title',
//   allDay: true,
//   start: new Date(2020, 11, 0),
//   end: new Date(2020, 11, 1),
// },
// {
//   id: 1,
//   title: 'Long Event',
//   start: new Date(2020, 11, 7),
//   end: new Date(2020, 11, 10),
// },

// {
//   id: 2,
//   title: 'DTS STARTS',
//   start: new Date(2020, 11, 13, 0, 0, 0),
//   end: new Date(2020, 11, 20, 0, 0, 0),
// },

// {
//   id: 3,
//   title: 'DTS ENDS',
//   start: new Date(2020, 11, 6, 0, 0, 0),
//   end: new Date(2020, 11, 13, 0, 0, 0),
// },

// {
//   id: 4,
//   title: 'Some Event',
//   start: new Date(2020, 11, 9, 0, 0, 0),
//   end: new Date(2020, 11, 10, 0, 0, 0),
// },
// {
//   id: 5,
//   title: 'Conference',
//   start: new Date(2020, 11, 11),
//   end: new Date(2020, 11, 13),
//   desc: 'Big conference for important people',
// }];
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log(response.data) // The entire response from the Rails API

      console.log(response.data.message) // Just the message
      this.setState({
        message: response.data.message
      });
    }) 
  }

  

  render() {
    return (
      <div className="App">
        <h1>{ this.state.message }</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button>
        <div className="cal_container">
          {/* <Calendar
            events={events}
            startAccessor="start"
            endAccessor="end"
            defaultDate={moment().toDate()}
            localizer={localizer}
          />
          <Paper elevation={3} /> */}
        </div>
      </div>
    );
  }
}

export default App;
