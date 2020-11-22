const express = require('express');
const router = express.Router();

fakeBookings = [
  {
    name: "funnyBooking",
    totalWorkers: 3,
    totalTime: 2,
    start: "2020-12-04T10:00:00-06:00",
    end: "2020-12-04T14:00:00-06:00",
  },
  {
    name: "funnyBooking2",
    totalWorkers: 3,
    totalTime: 2,
    start: "2020-11-05T80:00:00-06:00",
    end: "2020-11-05T12:00:00-06:00",
  },
  {
    name: "funnyBooking3",
    totalWorkers: 3,
    totalTime: 2,
    start: "2020-11-07T15:00:00-06:00",
    end: "2020-11-07T17:00:00-06:00",
  },
  {
    name: "funnyBooking4",
    totalWorkers: 3,
    totalTime: 2,
    start: "2020-11-10T14:00:00-06:00",
    end: "2020-11-10T15:30:00-06:00",
  },
  {
    name: "funnyBooking5",
    totalWorkers: 3,
    totalTime: 2,
    start: "2020-11-16T11:00:00-06:00",
    end: "2020-11-16T14:00:00-06:00",
  },
];

module.exports = (db) => {
    router.get('/', (req, res) => {
      console.log("request for bookings recieved")
      db.query("SELECT * FROM users WHERE id=100")
        .then(data =>{
          return res.json(fakeBookings);
        });
    });
  return router;
};



// return { 
//   id: booking.id,
//   title: booking.name,
//   desc: `Workers: ${booking.totalWorkers}, Time(p-hrs): ${booking.totalTime}`,
//   start: (new Date(booking.start)),
//   end: (new Date(booking.end))
// };