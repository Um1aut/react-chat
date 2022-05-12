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
import { browserLocalPersistence, browserSessionPersistence, getAuth, GoogleAuthProvider, inMemoryPersistence, setPersistence, signInWithEmailAndPassword } from 'firebase/auth';


const Login = () => {
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
  })
  const auth = getAuth();
  const login = (email: string, password: string) => {
    setPersistence(auth, browserSessionPersistence)
    .then(() => {
      return signInWithEmailAndPassword(auth, email, password);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      await login(data.email, data.password)
      router.push('/success')
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
          <Alert status='success'>
            <AlertIcon />
            You have successfully logged in!
          </Alert>
        ) : (
          <Anim>
          <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
          <Box textAlign="center">
          <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={handleLogin}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input onChange={(e: any) =>
                setData({
                  ...data,
                  email: e.target.value,
                }) } type="email" placeholder="test@test.com" />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Password</FormLabel>
                <Input  onChange={(e: any) =>
                setData({
                  ...data,
                  password: e.target.value,
                })
              } name="password" type="password" placeholder="*******" />
              </FormControl>
              <Button width="full" mt={4} type="submit">
                Sign In
              </Button>
              <Text text-align="center " fontSize="14px">Don't have an account? <a href="/signup">Sign up</a> </Text> 
            </form>
          </Box>
          </Box>
          </Anim>
        )}
    </Flex>
    </Stack>
    </Anim>
  );
} 

export default Login