import {Component} from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './JobCalendar.css'

import moment from 'moment'


// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
const localizer = momentLocalizer(moment) // or globalizeLocalizer

const events = [{
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
  start: new Date(2020, 11, 9, 0, 0, 0),
  end: new Date(2020, 11, 10, 0, 0, 0),
},
{
  id: 5,
  title: 'Conference',
  start: new Date(2020, 11, 11),
  end: new Date(2020, 11, 13),
  desc: 'Big conference for important people',
}];
class JobCalendar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bookings: events,
      message: null,//**** Temporary message
    }
  };
  selectDay = (info) => {
    //start and end are JS Date Objects so capture date and time
    let startDate = info.start
    let endDate = info.end
    this.setState({message: `${startDate.toDateString()} - ${endDate.toDateString()}`})
  };
  selectBooking = function(){};

  render() {
    return (
      <>
        {this.state.message && (
          <h1>
            {this.state.message}
          </h1>
        )}
        <div className="JobCalendar">
            <Calendar
              events={this.state.bookings}
              selectable={true}
              onSelectSlot={this.selectDay}
              onSelectEvent={this.selectBooking}
              startAccessor="start"
              endAccessor="end"
              defaultDate={moment().toDate()}
              localizer={localizer}
            />
        </div>
      </>
    );
  }
}

export default JobCalendar;





