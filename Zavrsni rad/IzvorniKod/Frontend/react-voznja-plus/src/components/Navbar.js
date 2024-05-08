import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRightIcon } from '@chakra-ui/icons';
import {
  List,
  Grid,
  GridItem,
  ListItem,
  ListIcon,
  Box,
  Image
} from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Grid
      templateColumns="repeat(6,1fr)"
      as="nav"
      p="10px"
      alignItems="center"
      justifyContent="space-between"
      paddingBottom="1em"
      fontFamily="revert-layer"
    >
      <GridItem
        colSpan={{ base: 6, lg: 2, xl: 1 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Image
          src="/images/Logo.png"
          alt="Logo"
          minWidth="20em"
          minHeight="10em"
        />
      </GridItem>

      <GridItem
        colSpan={{ base: 6, lg: 4, xl: 5 }}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box borderRadius="full" bg="RGBA(0, 0, 0, 0.06)">
          <List
            display="flex"
            color="black"
            fontSize="1.5em"
            alignItems="center"
            justifyContent="center"
            paddingRight="5em"
            paddingLeft="5em"
          >
            <ListItem
              margin=".em"
              padding=".5em"
              _hover={{
                backgroundColor: 'RGBA(0, 0, 0, 0.08)',
                borderRadius: 'full'
              }}
            >
              <NavLink to="/">
                <ListIcon as={ArrowRightIcon} color="black" marginRight="2em" />
                Početna
              </NavLink>
            </ListItem>
            <ListItem
              margin=".5em"
              padding=".5em"
              _hover={{
                backgroundColor: 'RGBA(0, 0, 0, 0.08)',
                borderRadius: 'full'
              }}
            >
              <NavLink to="/login">
                <ListIcon as={ArrowRightIcon} color="black" marginRight="1em" />
                Prijava
              </NavLink>
            </ListItem>
            <ListItem
              margin=".5em"
              padding=".5em"
              _hover={{
                backgroundColor: 'RGBA(0, 0, 0, 0.08)',
                borderRadius: 'full'
              }}
            >
              <NavLink to="/info">
                <ListIcon as={ArrowRightIcon} color="black" marginRight="1em" />
                Info
              </NavLink>
            </ListItem>
            <ListItem
              margin=".5em"
              padding=".5em"
              _hover={{
                backgroundColor: 'RGBA(0, 0, 0, 0.08)',
                borderRadius: 'full'
              }}
            >
              <NavLink to="/contact">
                <ListIcon as={ArrowRightIcon} color="black" marginRight="1em" />
                Kontakt
              </NavLink>
            </ListItem>
          </List>
        </Box>
      </GridItem>
    </Grid>
  );
}
