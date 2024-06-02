import React, { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  Box,
  GridItem,
  Grid,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  ModalFooter,
  Button,
  Input
} from '@chakra-ui/react';

export default function StudentCalendar() {
  const localizer = momentLocalizer(moment);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const myEventsList = [
    {
      title: 'Meeting with Bob',
      start: new Date(2024, 6, 1, 10, 0, 0), // June 1, 2023, 10:00 AM
      end: new Date(2024, 6, 1, 12, 0, 0), // June 1, 2023, 12:00 PM
      allDay: false
    },
    {
      title: 'Lunch Break',
      start: new Date(2024, 6, 2, 12, 0, 0), // June 2, 2023, 12:00 PM
      end: new Date(2024, 6, 2, 13, 0, 0), // June 2, 2023, 1:00 PM
      allDay: false
    },
    {
      title: 'Conference',
      start: new Date(2024, 6, 3), // June 3, 2023, all day
      end: new Date(2024, 6, 5), // June 5, 2023, all day
      allDay: true
    }
  ];

  const [events, setEvents] = useState([]);
  const [selectedDateStart, setSelctedDateStart] = useState(null);
  const [selectedDateEnd, setSelctedDateEnd] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [selectEvent, setSelectEvent] = useState(null);

  const handleSelectedSlot = (slotInfo) => {
    setSelctedDateStart(slotInfo.start);
    setSelctedDateEnd(slotInfo.end);
    setSelectEvent(null);
    onOpen();
  };

  const handleSelectedEvent = (event) => {
    onOpen();
    setSelectEvent(event);
    setEventTitle(event.title);
  };

  const saveEvent = () => {
    if (eventTitle && selectedDateStart) {
      if (selectEvent) {
        console.log('in save: ', eventTitle);
        const updatedEvent = { ...selectEvent, title: eventTitle };
        const updatedEvents = events.map((event) =>
          event.start === selectEvent.start && event.end === selectEvent.end
            ? updatedEvent
            : event
        );
        setEvents(updatedEvents);
      } else {
        const newEvent = {
          title: eventTitle,
          start: selectedDateStart,
          end: selectedDateEnd
        };
        setEvents([...events, newEvent]);
      }

      setEventTitle('');
      setSelectEvent(null);
      onClose();
    }
  };

  const deleteEvent = () => {
    if (selectEvent) {
      const updatedEvents = events.filter(
        (event) =>
          event.start !== selectEvent.start && event.end !== selectEvent.end
      );
      setEvents(updatedEvents);
      setEventTitle('');
      setSelectEvent(null);
    }
  };

  console.log('events: ', events);
  console.log('event title: ', eventTitle);

  return (
    <>
      <Navbar></Navbar>
      <Grid templateRows="repeat(2,1fr)">
        <GridItem>
          <Box margin="1em" padding=".5em" bg="RGBA(0, 0, 0, 0.06)">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500 }}
              selectable={true}
              onSelectSlot={handleSelectedSlot}
              onSelectEvent={handleSelectedEvent}
            />
          </Box>
          <Modal
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            size="2xl"
          >
            <ModalContent>
              <ModalHeader>
                {selectEvent ? 'Uredi događaj' : 'Dodaj novi događaj'}
              </ModalHeader>
              <ModalCloseButton onClick={() => setEventTitle('')} />
              <ModalBody>
                <Text fontWeight="bold" mb="1rem">
                  Naslov događaja
                </Text>
                <Input
                  type="text"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                ></Input>
              </ModalBody>
              <ModalFooter>
                {selectEvent && (
                  <Button colorScheme="red" mr={3} onClick={deleteEvent}>
                    Obriši
                  </Button>
                )}
                <Button colorScheme="blue" mr={3} onClick={saveEvent}>
                  Spremi
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </GridItem>
        <GridItem>item2</GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
