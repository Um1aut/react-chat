import React, { useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore"; 

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
    useBoolean
} from '@chakra-ui/react'
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

// async function getfromdb(db: any) {
//     const querySnapshot = await getDocs(collection(db, "users"));
//         querySnapshot.forEach((doc) => {
//                 return doc.data().name
//         });
//     }
const usera=auth.currentUser
export default function Sidebar() {
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

    const q = query(collection(db, "chats"));
    const [m] = useCollectionData(q, {firstMessager: 'firstMessager', secondMessager: 'secondMessager'})

    const [docState, setState] = useState()
    const [navSize, changeNavSize] = useState("large")

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

    const [chatCanBeCrated, setchatCanBeCreated] = useBoolean(false)

    const createChat = async (firstMessager, secondMessager) => {
        try {
            const q = query(collection(db, "chats"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                    const createChatSequence = docState + secondMessager
                    const createChatSequenceSecond = docState + firstMessager

                    const normal = doc.data().firstMessager + doc.data().secondMessager;
                    const reverse = doc.data().secondMessager + doc.data().firstMessager;

                    if(createChatSequence == normal || createChatSequence == reverse ||createChatSequenceSecond == normal || createChatSequenceSecond == reverse) {
                        console.log('dsads')
                        setchatCanBeCreated.off()
                    } else {
                        console.log('dsdsadsa')
                        setchatCanBeCreated.on()
                    }
            })

            if(chatCanBeCrated == true) {
                const docRef = await addDoc(collection(db, "chats"), {
                    firstMessager: firstMessager,
                    secondMessager: secondMessager
                });
                console.log("Document written with ID: ", docRef.id);
                setchatCanBeCreated.off()
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const handleChat = async (user) => {
        try {
        await createChat(docState, user)
        } catch (err) {
        console.log(err)
        }
    }
    AuthStateChange()
    getfromdb()
    return (
        <Box>
            <Flex pos="fixed" top="10%" left="5%">
                <Box maxWidth={"280px"} h="100%" rounded={"15px"} p={"2em"} pt="1.5em" pb="1.5em" bg={'blackAlpha.200'}>
                    {sign ?
                    (<Text><Heading fontSize={"17px"} mb="5px">{docState}</Heading> </Text>)
                    : 
                    (<Text 
                    text-align="center"
                    fontSize={"14px"}
                    pb="2">
                        Don't have an account? <Link href="/signup" pb="10px">Sign up</Link></Text> )}
                    <Divider/>
                    {
                    m && m.map((el) =>
                    el.firstMessager == docState ? 
                    (<Button variant={"solid"} h='2rem' w="100%" mt="2" size='sx'>{el.secondMessager}</Button>) : 
                    (el.secondMessager == docState ? 
                    (<Button variant={"solid"} h='2rem' w="100%" mt="2" size='sx'>{el.firstMessager}</Button>) : ('')
                    )
                    )}
                    <Divider mt="2"/>
                    <Button mt="2" variant="outline" h='1.75rem' w="100%" size='sm'>Account Preferences</Button>
                </Box>
            </Flex>
        </Box>
    )
}
