import React, { useState, useEffect } from 'react';

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
import { json } from 'react-router-dom';

export default function MyCalendar() {
  const localizer = momentLocalizer(moment);
  moment.locale('hr');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [events, setEvents] = useState([]);
  const [selectedDateStart, setSelctedDateStart] = useState(null);
  const [selectedDateEnd, setSelctedDateEnd] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [selectEvent, setSelectEvent] = useState(null);

  const token = sessionStorage.getItem('token');

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

  //dohvat podataka
  useEffect(() => {
    //kandidat ili instruktor gleda svoj kalendar
    const role = sessionStorage.getItem('role');
    if (role === 'kandidat') {
      fetch('/api/calendar/getStudentEvents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          StudentEmail: ''
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('No data found');
          }
          return response.json();
        })
        .then((response) => {
          const transofrmedData = response.map((event) => ({
            id: event.id,
            title: event.title,
            start: new Date(event.startTime),
            end: new Date(event.endTime)
          }));

          setEvents(transofrmedData);
          //console.log('events after fetching: ', events);
        })
        .catch((error) => {
          console.log('Dogodila se pogreska u progr: ', error);
        });
    } else {
      fetch('/api/calendar/getInstructorEvents', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
          InstructorEmail: ''
        }
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('No data found');
          }
          return response.json();
        })
        .then((response) => {
          const transofrmedData = response.map((event) => ({
            id: event.id,
            title: event.title,
            start: new Date(event.startTime),
            end: new Date(event.endTime)
          }));

          setEvents(transofrmedData);
          //console.log('events after fetching: ', events);
        })
        .catch((error) => {
          console.log('Dogodila se pogreska u progr: ', error);
        });
    }
  });

  //dodavanje i uredjivanje
  const saveEvent = () => {
    //uredjivanje postojeceg dogadjaja
    if (eventTitle) {
      if (selectEvent) {
        const existingEvent = {
          id: selectEvent.id,
          title: eventTitle,
          startTime: new Date(selectEvent.startTime),
          endTime: new Date(selectEvent.endTime)
        };
        if (sessionStorage.getItem('role') === 'kandidat') {
          fetch('/api/calendar/changeEvent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token
            },
            body: JSON.stringify(existingEvent)
          })
            .then((response) => {
              console.log('response: ', response);
              if (!response.ok) {
                throw new Error('No data found');
              }
            })
            .catch((error) => {
              console.log('Dogodila se pogreska u progr: ', error);
            });
        } else {
          //kandidat ili administrator gledaju kalendar kandidata
          fetch('/api/calendar/changeEvent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token
            },
            body: JSON.stringify(existingEvent)
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('No data found');
              }
              return response.json();
            })
            .catch((error) => {
              console.log('Dogodila se pogreska u progr: ', error);
            });
        }
      } else {
        //dodavanje novog dogadjaja
        const moment = require('moment-timezone');
        const newEvent = {
          title: eventTitle,
          startTime: moment(
            selectedDateStart,
            'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)'
          ).format('YYYY-MM-DDTHH:mm:ssZ'),
          endTime: moment(
            selectedDateEnd,
            'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)'
          ).format('YYYY-MM-DDTHH:mm:ssZ')
        };

        //backend call
        console.log('newEvent: ', newEvent);

        if (sessionStorage.getItem('role') === 'kandidat') {
          fetch('/api/calendar/putEvent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
              studentEmail: ''
            },
            body: JSON.stringify(newEvent)
          }).catch((error) => {
            console.log('Dogodila se pogreska u progr: ', error);
          });
        } else {
          //kandidat ili administrator gledaju kalendar kandidata
          fetch('/api/calendar/putEvent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
              studentEmail: sessionStorage.getItem('studentEmail')
            },
            body: JSON.stringify(newEvent)
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('No data found');
              }
              return response.json();
            })
            .catch((error) => {
              console.log('Dogodila se pogreska u progr: ', error);
            });
        }
      }

      onClose();
      setEventTitle('');
      setSelectEvent(null);
    }
  };

  //brisanje
  const deleteEvent = () => {
    console.log('in delete: ', eventTitle);
    console.log('selectedEvent: ', selectEvent);
    console.log('eventTitle: ', eventTitle);
    console.log('selectedDateStart: ', selectedDateStart);

    const existingEvent = {
      id: selectEvent.id,
      title: eventTitle,
      startTime: moment(
        selectEvent.start,
        'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)'
      ).format('YYYY-MM-DDTHH:mm:ssZ'),
      endTime: moment(
        selectEvent.end,
        'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (zz)'
      ).format('YYYY-MM-DDTHH:mm:ssZ')
    };

    console.log('existingEvent: ', existingEvent);

    fetch('/api/calendar/deleteEvent', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      body: JSON.stringify(existingEvent)
    })
      .then((response) => {
        console.log('response: ', response);
        if (!response.ok) {
          throw new Error('No data found');
        }
      })
      .catch((error) => {
        console.log('Dogodila se pogreska u progr: ', error);
      });

    setEventTitle('');
    setSelectEvent(null);
    onClose();
  };

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
          <Image
            src="/images/Road graphics.png"
            alt="no_data"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
