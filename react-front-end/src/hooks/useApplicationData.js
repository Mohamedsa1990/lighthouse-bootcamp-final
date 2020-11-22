
import { useState, useEffect } from "react";
import axios from "axios";
const testData = [{
  id: 0,
  title: 'All Day Event very long title',
  allDay: true,
  start: new Date(2020, 11, 0),
  end: new Date(2020, 11, 1),
},
{
  id: 1,
  title: 'Long Event',
  start: new Date(2020, 11, 7),
  end: new Date(2020, 11, 10),
},

{
  id: 2,
  title: 'DTS STARTS',
  start: new Date(2020, 11, 13, 0, 0, 0),
  end: new Date(2020, 11, 20, 0, 0, 0),
},

{
  id: 3,
  title: 'DTS ENDS',
  start: new Date(2020, 11, 6, 0, 0, 0),
  end: new Date(2020, 11, 13, 0, 0, 0),
},

{
  id: 4,
  title: 'Some Event',
  start: "2020, 11, 9",
  end: "2020, 11, 16",
},
{
  id: 5,
  title: 'Conference',
  start: new Date(2020, 11, 11),
  end: new Date(2020, 11, 13),
  desc: 'Big conference for important people',
}];
/**
 * useApplicationData - a custom hook for managing
 * main site data and maintaining consistency with the server 
 */
export default function useApplicationData(){

  //calendar - the main calendar data
  const [calendar, setCalendar] = useState(testData);
  const [bookings, setBookings] = useState([])
  //Load all initial site data
  useEffect(() => {
    Promise.all([
      axios.get("/api/bookings"),
      //OTHER INITIAL SITE LOAD DATA REQUESTS HERE
    ])
      .then((all) => {
        //load bookings into calendar array
        let bookingList = all[0].data;
        for (let i = 0; i < bookingList.length ; i++) {
          bookingList[i].bookingID = i;
        }
        setBookings(bookingList);
        setCalendar(bookingList.map((booking) => {
          return { 
            id: booking.bookingID,
            title: booking.name,
            desc: `Workers: ${booking.estimate_total_workers}, Time(p-hrs): ${booking.estimate_total_time}`,
            start: (new Date(booking.starts)),
            end: (new Date(booking.ends))
          };
        }))
                  console.log(calendar[0]);

        //OTHER INITIAL SITE LOAD DATA SAVING HERE
      })
      .catch((e) => {
        console.log(e);
        return e;
      });
  }, []);

  const addChangeJob = function(jobDetails) {
    if (!jobDetails.id) {
      //job id=0 > new job
      jobDetails.id = 0;
    }
    return axios.put(`/api/job/${jobDetails.id}`, jobDetails)
    .then((response) => {
      //create the updated/new calendar entry
      let newBooking = { 
        id: response.id,
        title: jobDetails.name,
        desc: `Workers: ${jobDetails.totalWorkers}, Time(p-hrs): ${jobDetails.totalTime}`,
        start: (new Date(jobDetails.start)),
        end: (new Date(jobDetails.end))
      };
      //get the index in the calendar bookings of the old entry if it exists 
      let bookingIndex = calendar.map((booking) => booking.id).indexOf(response.id);
      if (bookingIndex === -1) {
        //add a new booking
        setCalendar((old) => old.push(newBooking));
      } else {
        //update an old booking
        setCalendar((old) => old[bookingIndex] = newBooking);
      }
      //OTHER JOB DATA SAVING HERE
    })
    .catch((e) => {
      console.log("*************Error Saving Job************");
      return e;
    });
  };

  function cancelJob(id) {
    //request that the server delete the Job
    return axios.delete(`/api/appointments/${id}`)
    .then(() => {
      let bookingIndex = calendar.map((booking) => booking.id).indexOf(id);
      setCalendar((old) => old.splice(bookingIndex, 1));
      //OTHER JOB DATA DELETING HERE
    })
    .catch((e) => {
      console.log("*************Error Deleting Job************");
      return e;
    });
  };

  return {calendar, addChangeJob, cancelJob};
};