import React from 'react'

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = () => {
  return (
    <Calendar
      // defaultValue={new Date(2020, 5, 19)}

      selectRange={false}
      value={new Date(2020, 9, 5)}
      value={new Date(2020, 9, 1)}
    />
  )
}

export default MyCalendar;