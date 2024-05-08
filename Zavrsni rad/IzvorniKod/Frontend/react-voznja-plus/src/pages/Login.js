import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import {
  Image,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Box,
  Button
} from '@chakra-ui/react';

export default function Login() {
  const handleButtonClick = () => {
    // Add your logic here to handle the button click
    console.log('Button clicked!');
  };

  return (
    <>
      <Navbar></Navbar>
      <Box position="relative" width="100%" marginTop="3em" marginBottom="3em">
        <Image
          src="/images/road.jpg"
          alt="driving"
          width="100%"
          height="100%"
          objectFit="cover"
          padding="1em"
          backgroundColor="black"
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          background="RGBA(0, 0, 0, 0.5)"
          padding="1em"
          color="white"
          borderRadius="md"
          border="solid black"
          width={{ base: '40%', lg: '30%' }}
          height={{ base: '60%', lg: '40%' }}
          fontSize="3em"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <FormControl>
            <FormLabel>Email addresa</FormLabel>
            <Input type="email" />
          </FormControl>
          <FormControl>
            <FormLabel>Lozinka</FormLabel>
            <Input type="email" />
            <FormHelperText color="white">
              Unesite vaše korisničke podatke.
            </FormHelperText>
          </FormControl>
          <Button
            mt={4}
            colorScheme="gray"
            color="black"
            type="submit"
            _hover={{ color: 'white', bg: 'rgba(0, 0, 0, 0.06)' }}
            marginTop={{ base: '1em', lg: '3em' }}
            onClick={handleButtonClick}
          >
            Prijavi se!
          </Button>
        </Box>
      </Box>
      <Footer></Footer>
    </>
  );
}
