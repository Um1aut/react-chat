import Head from 'next/head'
import Navbar from '../components/Container.js'
import Content from '../components/home.js'
import Anim from '../components/section.js'
import Sidebar from '../components/Sidebar'
import {db} from '../config/firebase'
import { doc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { IconButton } from '@chakra-ui/react'
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
        Progress,Input, Box, Button, Spinner
} from '@chakra-ui/react'

export default function Index() {

  const q = query(collection(db, "messages"), orderBy("date", "asc"));
  const [m] = useCollectionData(q, {name: 'name', message: 'message'})
  const {colorMode} = useColorMode()
  const colorSecondary = {
    light: 'gray.700',
    dark: 'gray.400'
  }

  const [data, setData] = useState({
    messageText: '',
  })
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

  const qer = query(collection(db, "chats"));
  const [chats] = useCollectionData(qer, {firstMessager: 'firstMessager', secondMessager: 'secondMessager'})

  // const [chatCanBeCrated, setchatCanBeCreated] = useBoolean(false)

  // const createChat = async (firstMessager, secondMessager) => {
  //     try {
  //         const q = query(collection(db, "chats"));
  //         const querySnapshot = await getDocs(q);
  //         querySnapshot.forEach((doc) => {
  //                 const createChatSequence = docState + secondMessager
  //                 const createChatSequenceSecond = docState + firstMessager

  //                 const normal = doc.data().firstMessager + doc.data().secondMessager;
  //                 const reverse = doc.data().secondMessager + doc.data().firstMessager;

  //                 if(createChatSequence == normal || createChatSequence == reverse ||createChatSequenceSecond == normal || createChatSequenceSecond == reverse) {
  //                     console.log('dsads')
  //                     setchatCanBeCreated.off()
  //                 } else {
  //                     console.log('dsdsadsa')
  //                     setchatCanBeCreated.on()
  //                 }
  //         })

  //         if(chatCanBeCrated == true) {
  //             const docRef = await addDoc(collection(db, "chats"), {
  //                 firstMessager: firstMessager,
  //                 secondMessager: secondMessager
  //             });
  //             console.log("Document written with ID: ", docRef.id);
  //             setchatCanBeCreated.off()
  //         }
  //     } catch (e) {
  //         console.error("Error adding document: ", e);
  //     }
  // }

  const handleChat = async (user) => {
      try {
      await createChat(docState, user)
      } catch (err) {
      console.log(err)
      }
  }
  const [chatMessagesState, setMessagesState] = useState('')

  const [docRefState, setDocRefState] = useState()
  const OpenChat = async (firstMessager, secondMessager) => {
      const q = query(collection(db, "chats"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          if(secondMessager + firstMessager == doc.data().firstMessager + doc.data().secondMessager) {
              setMessagesState(doc.id)
          }
      })
      console.log(chatMessagesState)
      const chatDocRef = doc(db, "chats", chatMessagesState)
      const chatDocRef1 = query(collection(chatDocRef, "messages"), orderBy("date", "asc"))
      const [chats1] = useCollectionData(chatDocRef1, {name: 'name', message: 'message'})
      chats1.forEach((doc) => {
        console.log(doc.data())
      })
  }
  const handleOpenChat = async (chat) => {
    try {
      console.log("opening chat: " + chat)
      await OpenChat(docState, chat)
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
        const docRef = await addDoc(collection(db, "messages"), {
          name: name,
          message: message,
          date: new Date().getTime()
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }

  const handleMessage = async (e) => {
    e.preventDefault()
    try {
      document.getElementById('input').value = ''
      await sendMessage(docState, data.messageText)
    } catch (err) {
      console.log(err)
    }
  }

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, [])
  
  return (
    <>
    <Navbar/>
    <Anim>
    <Stack>
    <Content>
    <Anim>
        <Container pt="50px" pb="32px">
        {!loading ? (
          <Anim>
            <ul>
          {m && m.map((el)=>
          <Container display="flex" justifyContent={docState == el.name ? ('flex-end') : ('flex-start')} >
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
          </Container>
          )}
          </ul>
          </Anim>
        ) : (
          <Spinner
          position="absolute"
          top="50%"
          left="50%"
          ></Spinner>
        )}
        </Container>
      </Anim>
      <Flex w="100%" mt="1em" maxWidth="700px">
      <Box>
            <Flex pos="fixed" top="10%" left="5%">
                {loading ? (
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
                            (<Button variant={"solid"} onClick={() => handleOpenChat(el.secondMessager)} h='2rem' w="100%" mt="2" size='sx'>{el.secondMessager}</Button>) : 
                            (el.secondMessager == docState ? 
                            (<Button variant={"solid"} onClick={() => handleOpenChat(el.firstMessager)} h='2rem' w="100%" mt="2" size='sx'>{el.firstMessager}</Button>) : ('')
                            )
                            )}
                        <Divider mt="2"/>
                        <Button mt="2" variant="outline" h='1.75rem' w="100%" size='sm'>Account Preferences</Button>
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
        padding="30px"
        margin="auto"
        w={"60%"}
        left="20%"
        zIndex={1}
        >
            <Input variant={"filled"} id="input" onChange={(e) =>
                setData({
                  ...data,
                  messageText: e.target.value,
                }) } placeholder='Message...' size="lg"/>
            <Button onClick={handleMessage} h="50px" ml="5">Send</Button>
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
