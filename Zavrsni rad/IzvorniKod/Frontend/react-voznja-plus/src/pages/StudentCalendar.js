import React, { useState } from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/hr';

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
  Input,
  Flex,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Image
} from '@chakra-ui/react';

export default function StudentCalendar() {
  const localizer = momentLocalizer(moment);
  moment.locale('hr');

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
      <Grid>
        <GridItem margin="1em">
          <Flex display="row">
            <Card backgroundColor="RGBA(0, 0, 0, 0.06)" borderRadius="md">
              <CardHeader>
                <Heading size="md">Upute za korištenje</Heading>
                <Text pt="2" fontSize="sm">
                  U kalendar možete unijeti vremenski period u kojem ste
                  dostupni za održavanje obuke. U označenom periodu instruktor
                  će zakazati termin koji će biti vidljiv u kalendaru.
                </Text>
              </CardHeader>

              <CardBody>
                <Stack divider={<StackDivider />} spacing="4">
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Dodavanje
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Odaberite vremenski period u kojem želite dodati događaj.
                      To može biti jedan dan ili raspon više dana. U formi da
                      dodavanje događaja unesite potrebne podatke. Svoj odabir
                      potvrdite klikom na gumb "Spremi".
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Uređivanje
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Pronađite događaj koji želite urediti u svom kalendaru.
                      Kliknite na događaj kako biste otvorili formu za
                      uređivanje koja Vam omogućuje izmjenu postojećih detalja
                      događaja. Kada završite s uređivanjem, kliknite na gumb
                      "Spremi".
                    </Text>
                  </Box>
                  <Box>
                    <Heading size="xs" textTransform="uppercase">
                      Brisanje
                    </Heading>
                    <Text pt="2" fontSize="sm">
                      Pronađite događaj koji želite obrisati u svom kalendaru.
                      Kliknite na događaj kako biste otvorili formu za
                      uređivanje/brisanje koja Vam omogućuje izmjenu postojećih
                      detalja događaja. Svoj odabir potvrdite klikom na gumb
                      "Obriši".
                    </Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Flex>
        </GridItem>
        <GridItem>
          <Box
            margin="1em"
            padding=".5em"
            bg="RGBA(0, 0, 0, 0.06)"
            border="1px solid black"
            borderRadius="md"
          >
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 600 }}
              selectable={true}
              onSelectSlot={handleSelectedSlot}
              onSelectEvent={handleSelectedEvent}
              messages={{
                date: 'Datum',
                time: 'Vrijeme',
                event: 'Događaj',
                allDay: 'Cijeli dan',
                week: 'Tjedan',
                work_week: 'Radni tjedan',
                day: 'Dan',
                month: 'Mjesec',
                previous: 'Prethodni',
                next: 'Sljedeći',
                yesterday: 'Jučer',
                tomorrow: 'Sutra',
                today: 'Danas',
                agenda: 'Agenda',
                noEventsInRange: 'Nema događaja u ovom razdoblju.',
                showMore: (total) => `+ Prikaži još (${total})`
              }}
              formats={{
                monthHeaderFormat: (date, culture, localizer) =>
                  localizer.format(date, 'MMMM YYYY', culture) // Ensure month name is displayed in Croatian
              }}
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
        <GridItem>
          <Image src="/images/Road graphics.png" alt="no_data"></Image>
        </GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
