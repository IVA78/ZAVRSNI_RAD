import React from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Box } from '@chakra-ui/react';

export default function StudentCalendar() {
  const localizer = momentLocalizer(moment);

  const myEventsList = [
    {
      title: 'Meeting with Bob',
      start: new Date(2023, 5, 1, 10, 0, 0), // June 1, 2023, 10:00 AM
      end: new Date(2023, 5, 1, 12, 0, 0), // June 1, 2023, 12:00 PM
      allDay: false
    },
    {
      title: 'Lunch Break',
      start: new Date(2023, 5, 2, 12, 0, 0), // June 2, 2023, 12:00 PM
      end: new Date(2023, 5, 2, 13, 0, 0), // June 2, 2023, 1:00 PM
      allDay: false
    },
    {
      title: 'Conference',
      start: new Date(2023, 5, 3), // June 3, 2023, all day
      end: new Date(2023, 5, 5), // June 5, 2023, all day
      allDay: true
    }
  ];

  return (
    <>
      <Navbar></Navbar>
      <Box heigt="100vh" border="16px solid black">
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
        ></Calendar>
      </Box>
      <Footer></Footer>
    </>
  );
}
