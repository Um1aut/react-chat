import React, { useState } from 'react'
import '../config/firebase'
import { browserSessionPersistence, GoogleAuthProvider, setPersistence, getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { 
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  Button,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,} from '@chakra-ui/react'
  import Anim from '../components/section.js'
import {
  useColorMode,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import NextLink from 'next/link'
import styled from '@emotion/styled'

import DarkModeSwitch from './DarkModeSwitch'

import { useRouter } from 'next/router'

const auth = getAuth();

const Navbar = () => {
  const router = useRouter()

  const { colorMode } = useColorMode()

    const bgColor = {
        light: 'white',
        dark: 'gray.650'
    }

    const color = {
        light: 'black',
        dark: 'white'
    }

    const navHoverBg = {
        light: 'gray.600',
        dark: 'gray.300',
    }
  const StickNav = styled(Flex)`
    position: sticky;
    z-index: 10;
    top: 0;
    backdrop-filter: saturate(180%) blur(10px);
    transition: height .5s, line-height .5s;
  `
  
  const usera = auth.currentUser
  let [sign, changeSign] = useState()
  const AuthStateChange = async() => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        changeSign(true)
        // ...
      } else {
        // User is signed out
        // ...
        changeSign(false)
      }
    });
}
function signout(auth) {
    signOut(auth).then(() => {
      router.push('/')
    }).catch((error) => {
      console.log(error)
    });
}
AuthStateChange()

  return(
     <>
    <Box
      position="fixed"
      as="nav"
      w="100%"
      css={{ backdropFilter: 'blur(7px)' }}
      zIndex={1}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.md"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
      <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >        
        <Box>
          <NextLink href="/" passHref>
            <Button as="a" opacity="1.0"
            bg={bgColor[colorMode]}
            color={color[colorMode]}
            variant="ghost" >Home
            </Button> 
          </NextLink>
        </Box>
      </Stack>
          <Box pr={2} flex={1} align="right">
          {sign == true ? (
            <NextLink href="/" passHref>
              <Button as="a" opacity="1.0"
              bg={bgColor[colorMode]}
              color={color[colorMode]}
              variant="ghost" align="right"
              onClick={() => {
                signout(auth)
              }} >Logout
              </Button> 
            </NextLink>
                ) : (
                <NextLink href="/login" passHref>
                  <Button as="a" opacity="1.0"
                  bg={bgColor[colorMode]}
                  color={color[colorMode]}
                  variant="ghost" >Login
                  </Button>
              </NextLink>
            )}
            <DarkModeSwitch />
        <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <NextLink href="/" passHref>
                  <MenuItem as={Link}>Home</MenuItem>
                </NextLink>
                <NextLink href="/login" passHref>
                  <MenuItem as={Link}>Sign in</MenuItem>
                </NextLink>
                <NextLink href="/chats" passHref>
                  <MenuItem as={Link}>Chats</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </Box>
          
    </Box>
    </Container>
    </Box>
     </>
  )
  }

export default Navbar 
