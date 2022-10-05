import React from 'react';
import Navbar from '../components/Container.js'
import Anim from '../components/section.js'
import { useRouter } from 'next/router'
import { useState } from 'react'



import {db} from '../config/firebase'

import {
    createUserWithEmailAndPassword,
  } from 'firebase/auth'

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
const auth = getAuth();
const usera = auth.currentUser;



import {
  useColorMode,
} from '@chakra-ui/react'
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';


const Login = () => {
  const router = useRouter()
  const [data, setData] = useState({
    email: '',
    password: '',
    name: ''
  })

  const signup = async (email: string, password: string, name: string) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
          name: name,
          email: email
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    return (
        createUserWithEmailAndPassword(auth, email, password)
    )
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      await signup(data.email, data.password, data.name)
      router.push('/success')
    } catch (err) {
      console.log(err)
    }
  }
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
          <Heading>Sign up</Heading>
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
              <FormControl>
                <FormLabel>Tag</FormLabel>
                <Input onChange={(e: any) =>
                setData({
                  ...data,
                  name: e.target.value,
                }) } placeholder="@UserName" />
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
                Sign Up
              </Button> 
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