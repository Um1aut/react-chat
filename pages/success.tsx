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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContextProvider, useAuth } from '../context/AuthContext'


const Login = () => {
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const auth = getAuth();
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      await login(data.email, data.password)
      router.push('/')
    } catch (err) {
      console.log(err)
    }
  }
  const usera = auth.currentUser;
  const {colorMode} = useColorMode()
  return (
    <Anim>
    <Stack>
    <Navbar/>
    <Flex pt="3em" 
      bg={bgColor[colorMode]}
      color={color[colorMode]} width="full" align="center" justifyContent="center">
        {usera ? (
        <Box p={8} maxWidth="500px">
          <Alert status='success'>
            <AlertIcon />
            You have successfully logged in!
          </Alert>
      </Box>
        ) : (
          <div>Auth</div>
        )}
    </Flex>
    </Stack>
    </Anim>
  );
} 

export default Login