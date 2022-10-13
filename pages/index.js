import Head from 'next/head'
import Navbar from '../components/Container.js'
import Content from '../components/home.js'
import Anim from '../components/section.js'
import Settings from '../components/Sidebar'
import { Field, Form, Formik } from 'formik';
import {db} from '../config/firebase'
import { doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { HStack, IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import NextLink from 'next/link'
import { useCollectionData } from 'react-firebase-hooks/firestore';
const auth = getAuth();
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {useEffect, useState, useBoolean} from 'react'

import { useColorMode,
        Text,
        Heading,
        Divider,
        Flex,
        Stack,
        Container,
        Progress,Input, Box, Button, Spinner, Center,   FormControl,
        FormLabel,
        FormErrorMessage,
        FormHelperText,
} from '@chakra-ui/react'

export default function Index() {

  const q = query(collection(db, "messages"), orderBy("date", "asc"));
  const [m] = useCollectionData(q, {name: 'name', message: 'message'})
  const {colorMode} = useColorMode()
  const colorSecondary = {
    light: 'gray.700',
    dark: 'gray.400'
  }

  const [data, setData] = useState()
  let [sign, changeSign] = useState(Boolean)
  let [user, setUser] = useState('')

  const AuthStateChange = async() => {
    onAuthStateChanged(auth, (user) => {
          if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.email;
              setUser(uid)
              changeSign(true);
              // ...
          } else {
              // User is signed out
              // ...
              changeSign(false);
          }
      });
  }
  const [emailState, emailsetState] = useState("")
  const userState = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email
        emailsetState(email)
      }
  })
  const [docState, setdocState] = useState()
  const [chatMessagesState, setMessagesState] = useState('')

  const qer = query(collection(db, "chats"));
  const [chats] = useCollectionData(qer, {firstMessager: 'firstMessager', secondMessager: 'secondMessager'})

  const chatDoc = doc(db, "chats", chatMessagesState == "" ? ("G1GlnWYLe9QsUg4E9amT") : (chatMessagesState))
  const chatDocRef = query(collection(chatDoc, "messages"), orderBy("date", "asc"));
  const [chats1] = useCollectionData(chatDocRef, {name: 'name', message: 'message'})


  const handleChat = async (user) => {
      try {
      await createChat(docState, user)
      } catch (err) {
      console.log(err)
      }
  }

  const OpenChat = async (firstMessager, secondMessager) => {
      const q = query(collection(db, "chats"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          if(secondMessager + firstMessager == doc.data().firstMessager + doc.data().secondMessager) {
              setMessagesState(doc.id)
          } else if (firstMessager + secondMessager == doc.data().firstMessager + doc.data().secondMessager) {
            setMessagesState(doc.id)
          } else if(secondMessager + firstMessager == doc.data().secondMessager + doc.data().firstMessager) {
            setMessagesState(doc.id)
          } else if(firstMessager + secondMessager == doc.data().secondMessager + doc.data().firstMessager) {
            setMessagesState(doc.id)
          }
      })
      console.log(chatMessagesState)
  }

  const [buttonVariant, setButtonVariant] = useState(Boolean)

  const handleOpenChat = async (chat) => {
    try {
      console.log("opening chat: " + chat)
      setData('')
      setButtonVariant(true)
      setLoading(true);
      await OpenChat(docState, chat)
      setLoading(false)
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
      setButtonVariant(false)
    } catch (err) {
      console.log(err)
    }
  }

  const getfromdb = async () => {
          const querySnapshot = await getDocs(collection(db, "users"));
          if (userState) {
              querySnapshot.forEach((doc) => {
                  if(emailState == doc.data().email) {
                      setdocState(doc.data().name)
                  }
              });
          }
  }
  AuthStateChange()
  getfromdb()
  const sendMessage = async (name, message) => {
    try {
        const docRef = await addDoc(collection(chatDoc, "messages"), {
          name: name,
          message: message,
          date: new Date().getTime()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }
  const [buttonLoading, setButtonLoading] = useState(Boolean)
  const handleMessage = async (e) => {
    e.preventDefault()
    try {
        setButtonLoading(true)
        window.scrollTo(0, document.body.scrollHeight);
        setData('')
        await sendMessage(docState, data)
        window.scrollTo(0, document.body.scrollHeight);
        setButtonLoading(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (event) => setData(event.target.value)

  const [loading, setLoading] = useState(true)
  const [Selectorloading, setSelectorloading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
    setTimeout(() => setSelectorloading(false), 2000);
  }, [])
  
  return (
    <>
    <Navbar/>
    <Anim>
    <Stack>
    <Content>
    <Anim>
      <Center mb="100" mt="60px">
        {!loading ? (
            <Anim w="100%">
            {chats1 && chats1.map((el)=>
            <Flex display="flex" w="400px" justifyContent={docState == el.name ? ('flex-end') : ('flex-start')} >
              <Anim>
                <Box mb="5px" 
                bgGradient = {docState == el.name ? ('linear(to-r, pink.200, blue.500)') : ('linear(to-r, blackAlpha.300, blackAlpha.300)')}
                rounded={"25px"} 
                p={4} 
                color={colorMode}>
                  <Text pb={docState == el.name ? ("0px") : ('5px')} fontSize={"12px"} color={colorMode}>{
                  docState == el.name ? ('') : (el.name)
                  }</Text>
                  {el.message}
                </Box>
              </Anim>
            </Flex>
            )}
            </Anim>
          ) : (
            <Spinner
            position="absolute"
            top="50%"
            left="50%"
            ></Spinner>
          )}
      </Center>
      </Anim>
      <Flex w="100%" mt="1em" maxWidth="700px">
      <Box>
            <Flex pos="fixed" top="10%" left="5%">
                {Selectorloading ? (
                    <Spinner></Spinner>
                ) : (
                    <Anim>
                        <Box css={{ backdropFilter: 'blur(15px)' }} maxWidth={"280px"} h="100%" rounded={"15px"} p={"2em"} pt="1.5em" pb="1.5em" bg={'blackAlpha.200'}>
                        {sign ?
                            (<Text><Heading fontSize={"17px"} mb="5px">{docState}</Heading> </Text>)
                        : 
                            (<Text 
                            text-align="center"
                            fontSize={"14px"}
                            pb="2">
                                Don't have an account? <NextLink href="/signup">Sign up</NextLink></Text> )}
                            <Divider/>
                            {
                            chats && chats.map((el) =>
                            el.firstMessager == docState ? 
                            (<Button _active={{
                              bg: '#dddfe2',
                              transform: 'scale(0.98)',
                              borderColor: '#bec3c9',
                            }} 
                            _focus={{
                              boxShadow:
                                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }} variant={"solid"} onClick={() => {handleOpenChat(el.secondMessager)}} h='2rem' w="100%" mt="2" size='sx'>{el.secondMessager}</Button>) : 
                            (el.secondMessager == docState ? 
                            (<Button _active={{
                              bg: '#dddfe2',
                              transform: 'scale(0.98)',
                              borderColor: '#bec3c9',
                            }} 
                            _focus={{
                              boxShadow:
                                '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                            }} variant={"solid"} onClick={() => {handleOpenChat(el.firstMessager) }} h='2rem' w="100%" mt="2" size='sx'>{el.firstMessager}</Button>) : ('')
                            )
                            )}
                        <Divider mt="2"/>
                        <Settings/>
                        </Box>
                    </Anim>
                )}
            </Flex>
        </Box>
      <Box
      w="100%"
      >
        <Box
      css={{ backdropFilter: 'blur(8px)' }}
      zIndex={0}
      pos="fixed"
      top="95%"
      left="50%"
      w={"100%"}
      
      transform="translate(-50%, -50%)">
        <Flex
        justifyContent={"center"}
        padding="30px"
        margin="auto"
        w={"60%"}
        left="20%"
        zIndex={1}
        >
          <form isRequired>
            <HStack justifyContent={"flex-end"}>
              <Input variant={"filled"} id="input" value={data} onChange={handleChange} placeholder='Message...' size="lg"/>
              <Button type='submit' variant='solid' isLoading={buttonLoading} onClick={handleMessage} h="50px" ml="5" >Send</Button>
              </HStack>
          </form>
        </Flex>
        </Box>
      </Box>
    </Flex>
    
    </Content>
    </Stack>
    </Anim>
    </>
  );
}
