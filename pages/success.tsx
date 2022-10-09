import React from 'react';
import Navbar from '../components/Container.js'
import Anim from '../components/section.js'
import { useRouter } from 'next/router'
import { useState } from 'react'

import {
  Flex,
  Text,
  Box,
  Heading,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Button
} from '@chakra-ui/react'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

const bgColor = {
  light: 'white',
  dark: 'gray.650'
}

const color = {
  light: 'black',
  dark: 'white'
}

import {
  useColorMode,
} from '@chakra-ui/react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
  const auth = getAuth();
  const usera = auth.currentUser;
  let [sign, changeSign] = useState(Boolean)
  const AuthStateChange = async() => {
    onAuthStateChanged(auth, (user) => {
          if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              changeSign(true);
              // ...
          } else {
              // User is signed out
              // ...
              changeSign(false);
          }
      });
  }
  AuthStateChange()
  const {colorMode} = useColorMode()
  return (
    <Anim>
    <Stack>
    <Navbar/>
    <Flex pt="3em" 
      bg={bgColor[colorMode]}
      color={color[colorMode]} width="full" align="center" justifyContent="center">
        {sign ? (
        <Box p={8} maxWidth="500px">
          <Alert status='success'>
            <AlertIcon />
            You have successfully logged in!
          </Alert>
      </Box>
        ) : (
          <Box p={8} maxWidth="500px">
            <Alert status='error'>
              <AlertIcon />
              Invalid login or password
            </Alert>
          </Box>
        )}
    </Flex>
    </Stack>
    </Anim>
  );
} 

export default Login