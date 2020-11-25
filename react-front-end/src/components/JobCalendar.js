import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './JobCalendar.css'

import moment from 'moment'
const section = {
  height: "100%",
  padding: 5
};

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

export default function App({selectedDay, setDay, bookings}){
  const [message, setMessage] = useState()

  useEffect(() => {
    console.log("useEffect");
    console.log(selectedDay.starts);
    console.log("endEffect")
  }, [selectedDay])
  
  const selectDay = (info) => {
    //start and end are JS Date Objects so capture date and time
    let startDate = info.start;
    let endDate = info.end;
    setMessage(`${startDate.toDateString()} - ${endDate.toDateString()}`)
    setDay({starts: startDate, ends: endDate});
    console.log("**********selectDay")
    console.log(startDate.getDate());
  };

  const highlightDays = (date) => {
    let currentDay = (new Date()).getDate();
    let selection = selectedDay.starts.getDate();
    if (date.getDate() === currentDay || date.getDate() === selection)
      return {
        className: 'highlighted-day',
        style: {
          border: 'solid 3px ' + (date.getDate() === currentDay ? '#afa' : '#faa'),
        },
      }
    else return {}
  }
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
          events={bookings}
          selectable={true}
          onSelectSlot={selectDay}
          dayPropGetter={highlightDays}
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

