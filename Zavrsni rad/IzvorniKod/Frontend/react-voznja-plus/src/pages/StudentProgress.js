import React from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { useState, useEffect } from 'react';

import {
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  Box,
  StepTitle,
  StepDescription,
  StepSeparator,
  GridItem,
  Grid,
  Text,
  Flex,
  ModalBody,
  ModalHeader,
  Modal,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  ModalFooter,
  useToast
} from '@chakra-ui/react';

import { MdDateRange, MdEditNote } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';

export default function StudentProgress() {
  const [stepsA, setStepsA] = useState([]);
  const [stepsB, setStepsB] = useState([]);
  const [drivingHours, setDrivingHours] = useState([]);
  const [drivingHoursA, setDrivingHoursA] = useState([]);
  const [drivingHoursB, setDrivingHoursB] = useState([]);

  const [drivingHoursALength, setDrivingHoursALength] = useState(0);
  const [drivingHoursBLength, setDrivingHoursBLength] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const {
    isOpen: isSecondModalOpen,
    onOpen: onSecondModalOpen,
    onClose: onSecondModalClose
  } = useDisclosure();

  const [modalData, setModalData] = useState(null);
  const [backendData, setBackendData] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    field: '',
    date: '',
    status: '',
    note: '',
    email: ''
  });

  const token = sessionStorage.getItem('token');

  useEffect(() => {
    fetch('/stepsA.json')
      .then((response) => response.json())
      .then((data) => setStepsA(data))
      .catch((error) => console.error('Error fetching the steps:', error));
  }, []);

  useEffect(() => {
    fetch('/stepsB.json')
      .then((response) => response.json())
      .then((data) => setStepsB(data))
      .catch((error) => console.error('Error fetching the steps:', error));
  }, []);

  useEffect(() => {
    fetch('/api/driving_hours/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
        StudentEmail: sessionStorage.getItem('studentEmail')
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No data found');
        }
        return response.json();
      })
      .then((response) => {
        setDrivingHours(response);
        setDrivingHoursA(drivingHours.filter((d) => d.field === 'V'));
        setDrivingHoursB(drivingHours.filter((d) => d.field === 'C'));

        setDrivingHoursALength(drivingHoursA.length);
        setDrivingHoursBLength(drivingHoursB.length);
      })
      .catch((error) => {
        console.log('Dogodila se pogreska u progr: ', error);
      });
  });

  const handleStepClickA = (index) => {
    const clickedStepData = stepsA[index];
    setModalData(clickedStepData);
    setBackendData(drivingHoursA[index]);
    onOpen();
  };

  const handleStepClickB = (index) => {
    const clickedStepData = stepsB[index];
    setModalData(clickedStepData);
    setBackendData(drivingHoursB[index]);
    onOpen();
  };

  const toCalendar = () => {
    navigate('/usercalendar');
  };

  const resetForm = () => {
    setFormData({ field: '', date: '', status: '', note: '', email: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    // Logika za slanje forme na backend
    try {
      const response = await fetch('/api/driving_hours/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      onSecondModalClose();
    } catch (error) {
      console.error('Neuspješno spremanje bilješke na poslužitelj', error);
    }

    resetForm();
    toast({
      title: 'Uspješno spremljena bilješka!',
      description: 'Uspješno ste spremili novu bilješku.',
      status: 'success',
      duration: 5000,
      isClosable: true
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <Grid
        templateColumns="repeat(2,1fr)"
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <GridItem colSpan={4} margin="1em" gap={4}>
          <Button
            m={4}
            colorScheme="white"
            color="black"
            variant="outline"
            borderColor="RGBA(23,24,16)"
            _hover={{ color: 'white', bg: 'RGBA(23,24,16)' }}
            onClick={toCalendar}
            justifySelf="end"
            width="sm"
          >
            Pogledaj kalendar
          </Button>

          <Button
            m={4}
            colorScheme="white"
            color="black"
            variant="outline"
            borderColor="RGBA(23,24,16)"
            _hover={{ color: 'white', bg: 'RGBA(23,24,16)' }}
            onClick={onSecondModalOpen}
            justifySelf="end"
            width="sm"
          >
            Upiši bilješku
          </Button>

          <Modal isOpen={isSecondModalOpen} onClose={onSecondModalClose}>
            <ModalContent>
              <ModalHeader>Unos bilješke za održani sat</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl isRequired>
                  <FormLabel htmlFor="field">Polje</FormLabel>
                  <Select
                    id="field"
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    placeholder="Izaberite polje"
                  >
                    <option value="V">Vežbalište</option>
                    <option value="C">Otvorena cesta</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="date">Datum</FormLabel>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="status">Status</FormLabel>
                  <Select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    border="1px solid black"
                  >
                    <option value="" disabled>
                      Izaberite status
                    </option>
                    <option value="USPJEH">uspješno savladano</option>
                    <option value="NEUSPJEH">neuspješno savladano</option>
                    <option value="DODATNO_VJEZBATI">
                      solidan pokušaj: dodatno vježbati
                    </option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="note">Bilješka</FormLabel>
                  <Textarea
                    id="note"
                    name="note"
                    value={formData.note}
                    onChange={handleChange}
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  mt={4}
                  mr={3}
                  colorScheme="white"
                  color="RGBA(23,24,16)"
                  variant="outline"
                  borderColor="RGBA(23,24,16)"
                  _hover={{ color: 'white', bg: 'RGBA(23,24,16)' }}
                  marginTop={{ base: '1em', lg: '3em' }}
                  margin="1em"
                  onClick={handleSubmit}
                >
                  Spremi
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </GridItem>

        <GridItem
          colSpan={{ base: 3, lg: 2 }}
          display="flex"
          justifyContent="center"
          backgroundColor="RGBA(0, 0, 0, 0.06)"
          margin="1em"
          borderRadius="full"
        >
          <Text fontSize="2xl">
            Želiš vidjeti bilješke sa sata? Klik na točkicu!
          </Text>
        </GridItem>

        <GridItem
          colSpan="4"
          display="flex"
          alignItems="center"
          justifyContent="center"
          backgroundColor="RGBA(0, 0, 0, 0.06)"
          margin="1em"
          padding="3em"
          borderRadius="md"
        >
          <Flex direction="column" alignItems="center">
            <Text fontSize="3xl" fontWeight="bold">
              Sadržaj osposobljavanja na prometnom vježbalištu
            </Text>
            <Stepper
              index={drivingHoursALength} //kasnije ce ovo biti svi sati koji su odradjeni!
              orientation="vertical"
              gap="0"
              marginTop="3em"
              paddingLeft="40%"
              colorScheme="green"
            >
              {stepsA.map((step, index) => (
                <Step
                  key={index}
                  cursor="pointer"
                  onClick={() => handleStepClickA(index)}
                >
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box key={index} flexShrink="0" width="60%">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    size="2xl"
                  >
                    <ModalContent>
                      <ModalHeader>
                        {modalData ? modalData.title : ''}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Grid gap={4} marginBottom="2em">
                          <GridItem>
                            <Flex
                              direction="column"
                              align="left"
                              marginTop="2em"
                              marginLeft="2em"
                            >
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <MdDateRange />
                                </Box>
                                {backendData ? backendData.date : ''}
                              </Text>
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <FaCheck />
                                </Box>
                                {backendData ? backendData.status : ''}
                              </Text>
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <MdEditNote />
                                </Box>
                                {backendData ? backendData.note : ''}
                              </Text>
                            </Flex>
                          </GridItem>
                        </Grid>
                      </ModalBody>
                    </ModalContent>
                  </Modal>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
            <Text fontSize="3xl" fontWeight="bold" marginTop="2em">
              Sadržaj osposobljavanja na javnoj cesti
            </Text>
            <Stepper
              index={drivingHoursBLength}
              orientation="vertical"
              gap="0"
              marginTop="3em"
              paddingLeft="40%"
              colorScheme="green"
            >
              {stepsB.map((step, index) => (
                <Step
                  key={index}
                  cursor="pointer"
                  onClick={() => handleStepClickB(index)}
                >
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>

                  <Box key={index} flexShrink="0" width="60%">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>

                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    size="2xl"
                  >
                    <ModalContent>
                      <ModalHeader>
                        {modalData ? modalData.title : ''}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Grid
                          templateColumns="repeat(1, 1fr)"
                          gap={4}
                          marginBottom="2em"
                        >
                          <GridItem>
                            <Flex
                              direction="column"
                              align="left"
                              marginTop="2em"
                              marginLeft="2em"
                            >
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <MdDateRange />
                                </Box>
                                {backendData ? backendData.date : ''}
                              </Text>
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <FaCheck />
                                </Box>
                                {backendData ? backendData.status : ''}
                              </Text>
                              <Text display="flex" alignItems="center">
                                <Box marginRight="4">
                                  <MdEditNote />
                                </Box>
                                {backendData ? backendData.note : ''}
                              </Text>
                            </Flex>
                          </GridItem>
                        </Grid>
                      </ModalBody>
                    </ModalContent>
                  </Modal>

                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Flex>
        </GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
