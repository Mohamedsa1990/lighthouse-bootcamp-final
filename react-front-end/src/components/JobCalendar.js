import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import './JobCalendar.css'

import moment from 'moment'
const section = {
  height: "100%",
  padding: 5
};

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer
export default function App(props){
  const [message, setMessage] = useState()

  const selectDay = (info) => {
    //start and end are JS Date Objects so capture date and time
    let startDate = info.start
    let endDate = info.end
    setMessage(`${startDate.toDateString()} - ${endDate.toDateString()}`)
  };
  const selectBooking = function(){};

  return (
    <>
      {message && (
        <h1>
          {message}
        </h1>
      )}
      <div className="JobCalendar" style={section}>
        <Calendar
          events={props.bookings}
          selectable={true}
          onSelectSlot={selectDay}
          onSelectEvent={selectBooking}
          startAccessor="start"
          endAccessor="end"
          defaultDate={moment().toDate()}
          localizer={localizer}
        />
      </div>
    </>
  );
}

