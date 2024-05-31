import React from 'react';

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
  Button,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton
} from '@chakra-ui/react';

export default function Progress() {
  const [stepsA, setStepsA] = useState([]);
  const [stepsB, setStepsB] = useState([]);
  const [drivingHours, setDrivingHours] = useState([]);
  const [drivingHoursA, setDrivingHoursA] = useState([]);
  const [drivingHoursB, setDrivingHoursB] = useState([]);

  const [drivingHoursALength, setDrivingHoursALength] = useState(0);
  const [drivingHoursBLength, setDrivingHoursBLength] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
    fetch('/api/driving_hours/getMy', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: token }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('No data found');
        }
        return response.json();
      })
      .then((response) => {
        console.log('driving hours: ', response);
        setDrivingHours(response);
        setDrivingHoursA(drivingHours.filter((d) => d.field === 'V'));
        setDrivingHoursB(drivingHours.filter((d) => d.field === 'C'));
        console.log('driving hoursA: ', drivingHoursA);
        console.log('driving hoursB: ', drivingHoursB);
        setDrivingHoursALength(drivingHoursA.length);
        setDrivingHoursBLength(drivingHoursB.length);
        console.log('a length: ', drivingHoursALength);
        console.log('b length: ', drivingHoursBLength);
      })
      .catch((error) => {
        console.log('Dogodila se pogreska u progr: ', error);
      });
  });

  return (
    <>
      <Navbar></Navbar>
      <Grid
        templateColumns="repeat(4,1fr)"
        justifyContent="center"
        alignItems="center"
      >
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
                <Step key={index} cursor="pointer" onClick={onOpen}>
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
                  >
                    <ModalContent>
                      <ModalHeader>Modal Title</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text fontWeight="bold" mb="1rem">
                          You can scroll the content behind the modal
                        </Text>
                      </ModalBody>

                      <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                          Close
                        </Button>
                      </ModalFooter>
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
                <Step key={index}>
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
