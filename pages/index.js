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

import { useCollectionData } from 'react-firebase-hooks/firestore';
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
  
  return (
    <Anim>
    <Stack>
    <Navbar/>
    <Content>
    <Anim>
        <Container pt="50px" pb="32px">
        <ul>
        {
        m && m.map((el)=>
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
        )
        }
        </ul>
        </Container>
      </Anim>
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
  );
}
