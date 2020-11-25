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
    console.log("HHHHHHHHHH")
    console.log(info);
    //start and end are JS Date Objects so capture date and time
    let startDate = new Date(info.start.getTime());
    let endDate = new Date(info.end.getTime());
    startDate.setHours( 0, 0, 0);
    endDate.setHours(23, 59, 59);
    setMessage(`${startDate.toDateString()} - ${endDate.toDateString()}`)
    setDay({starts: startDate, ends: endDate});
    console.log("**********selectDay")
    console.log(startDate.getDate());
  };

  const onNavigate = (date) => {
    selectDay({start: date, end: date});
  }

  const highlightDays = (date) => {
    let currentDay = new Date();
    const currentMonth = currentDay.getMonth;
    currentDay = currentDay.getDate;
    
    const selectDay = selectedDay.starts.getDate();
    const selectMonth = selectedDay.starts.getMonth();

    if ((date.getDate() === currentDay && date.getMonth() === currentMonth )|| (date.getDate() === selectDay && date.getMonth() === selectMonth))
      return {
        className: 'highlighted-day',
        style: {
          border: 'solid 3px #afa',
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
          onNavigate={onNavigate}
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

