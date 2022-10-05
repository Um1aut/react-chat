import Head from 'next/head'
import Navbar from '../components/Container.js'
import Content from '../components/home.js'
import Anim from '../components/section.js'
import Sidebar from '../components/Sidebar'
import {db} from '../config/firebase'
import { doc, onSnapshot } from "firebase/firestore";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
const auth = getAuth();
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {useState} from 'react'

import { useColorMode,
        Text,
        Heading,
        Flex,
        Stack,
        Container,
        Progress,Input, Box, Button
} from '@chakra-ui/react'

export default function Index() {
  const {colorMode} = useColorMode()
  const colorSecondary = {
    light: 'gray.700',
    dark: 'gray.400'
  }

  const [data, setData] = useState({
    messageText: '',
  })

  // const sendMessage = (messageText) => {
  //   try {
  //     console.log(messageText)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

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
  const [emailState, emailsetState] = useState("")
  const userState = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const email = user.email
        emailsetState(email)
      }
  })
  const [docState, setState] = useState()

  const getfromdb = async () => {
          const querySnapshot = await getDocs(collection(db, "users"));
          if (userState) {
              querySnapshot.forEach((doc) => {
                  if(emailState == doc.data().email) {
                      setState(doc.data().name)
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
          message: message
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }

  const handleMessage = async (e) => {
    e.preventDefault()
    try {
      await sendMessage(docState ,data.messageText)
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <Anim>
    <Stack>
    <Navbar/>
    <Content>
      <Flex pos="absolute" top="10%" left="20%" alignItems={"center"} w="60%" pb="100px">
        {}
      </Flex>
      <Flex w="100%" mt="1em" maxWidth="700px">
      <Sidebar />
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
            <Input onChange={(e) =>
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
  );
}
