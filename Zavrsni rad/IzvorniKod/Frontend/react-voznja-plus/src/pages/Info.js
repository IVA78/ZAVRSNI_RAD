import React from 'react';

import { NavLink } from 'react-router-dom';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Grid, GridItem, Image, Box, Button, Text } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';

export default function Info() {
  return (
    <>
      <Navbar></Navbar>
      <Grid
        templateColumns="repeat(5,1fr)"
        width="100%"
        fontFamily="revert-layer"
      >
        <GridItem
          colSpan={{ base: '5', lg: '5' }}
          minHeight={{ base: '50vh', lg: '100vh' }}
          position="relative"
        >
          <Box
            bg="RGBA(0, 0, 0, 0.06)"
            width="100%"
            height="100%"
            borderRadius="1.5em"
            loadingText="Šalje se..."
          ></Box>
        </GridItem>

        <GridItem
          colSpan={{ base: '3', lg: '3' }}
          minHeight={{ base: '25vh', lg: '50vh' }}
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <Image src="/images/teacherStudent.png" alt="teacher-student"></Image>
        </GridItem>
        <GridItem
          colSpan={{ base: '2', lg: '2' }}
          minHeight={{ base: '25vh', lg: '50vh' }}
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize="xl">
            Imate li dodatna pitanja ili želite saznati više o našim uslugama?
            Ne ustručavajte se kontaktirati nas! Naš tim stručnjaka spreman je
            odgovoriti na vaša pitanja i pružiti vam sve potrebne informacije.
            Kliknite na gumb "Pošalji upit" kako biste nam poslali upit.
            <br />
            <br />
            Veselimo se što ćemo vam pomoći u ostvarivanju vaših ciljeva.
          </Text>
          <NavLink to="/contact">
            <Button
              leftIcon={<EmailIcon />}
              mt={4}
              border="1px solid black"
              marginTop="2em"
              marginBottom="2em"
              backgroundColor="RGBA(0, 0, 0, 0.06)"
              _hover={{
                backgroundColor: 'RGBA(0, 0, 0, 0.10)'
              }}
            >
              Pošalji upit!
            </Button>
          </NavLink>
        </GridItem>
      </Grid>
      <Footer></Footer>
    </>
  );
}
