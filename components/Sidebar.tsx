import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, setDoc } from "firebase/firestore"; 
import NextLink from 'next/link'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Link,
    Box,
    Button,
    Spinner,
    useBoolean,
    Center,
    Progress,
    useDisclosure,
    ModalOverlay,
    Modal,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useColorMode,
    Input,
    HStack,
    FormErrorMessage
} from '@chakra-ui/react'
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons'
import { Select } from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'
import { IoPawOutline } from 'react-icons/io5'
import NavItem from './NavItem'

const auth = getAuth();
const user = auth.currentUser;

import {db} from '../config/firebase'
import router from 'next/router';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Anim from './section';

function Settings() {
    const bgColor = {
      light: 'white',
      dark: 'gray.650'
    }
    
    const color = {
      light: 'black',
      dark: 'white'
    }

    const OverlayOne = () => (
      <ModalOverlay
        bg={bgColor[colorMode]}
        backdropFilter='blur(10px)'
      />
    )
    const countries = [
        "nigeria",
        "japan",
        "india",
        "united states",
        "south korea",
      ];
  
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)
    const {colorMode} = useColorMode()
    const [value, setValue] = React.useState('')
    const handleChange = (event) => setValue(event.target.value)
    let [sign, changeSign] = useState(Boolean)
    let [user, setUser] = useState('')
    const [docState, setdocState] = useState()

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

    const [emailState, emailsetState] = useState("")
    const userState = onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          const email = user.email
          emailsetState(email)
        }
    })
    const [data, setData] = useState('')

        const q = query(collection(db, "users"));
        const [users] = useCollectionData(q, {
            name: 'name',
            email: 'email'
        })
        const [opData, setOpData] = useState('')

        const createNewChat = async (first, second) => {
        }
        const [a, seta] = useState(Boolean)

        const createChatHandler = async(e) => {
          try {
            console.log(docState)
            console.log(opData)
            const q = query(collection(db, "chats"));
            const querySnapshot = await getDocs(q);
            let a1 = true;
            querySnapshot.forEach((doc) => {
              console.log(opData + docState + ' ' + doc.data().firstMessager + doc.data().secondMessager)
              console.log(opData + docState + ' ' + doc.data().secondMessager + doc.data().firstMessager)
                if(opData + docState == doc.data().firstMessager + doc.data().secondMessager) {
                  a1 = false
                } 
                if(opData + docState == doc.data().secondMessager + doc.data().firstMessager) {
                  a1 = false
                }
            })
            console.log(a1)
            if(a1) {
              await addDoc(collection(db, "chats"), {
                firstMessager: docState,
                secondMessager: opData
              });
              a1 = false;
              setData('')
            } else { setData('Chat with this user is already added!') }
          } catch (e) {
            console.log(e)
          }
        }
        const handleData = async (event) => setOpData(event.target.value)


    return (
      <>
      <Button onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen()
          }} mt="2" variant="outline" h='1.75rem' w="100%" size='sm'>Add New Chat</Button>
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          {overlay}
          <ModalContent >
            <ModalHeader>Add a new chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody >
            <Text fontSize="18px">Select user</Text>
            <Select placeholder='Select option'>
              {users && users.map((el) => 
                docState == el.name ? ("") : (<option onClick={handleData} value={el.name}>{el.name}</option>)
              )}
            </Select>
            <Text color="red">{data}</Text>
            </ModalBody>
            <ModalFooter >
              <Button onClick={createChatHandler}>Add</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}


export default Settings