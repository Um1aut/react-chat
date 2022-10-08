import React, { useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDocs } from "firebase/firestore"; 

import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Link,
    Box
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
    AuthStateChange()
    getfromdb()
    return (
        <Box>
            <Flex pos="fixed" top="20%" left="5%">
            {sign ? (<Text><Heading size="sm">{docState}</Heading> </Text>) : (<Text text-align="center " fontSize="14px">Don't have an account? <a href="/signup">Sign up</a> </Text> )}
            </Flex>
        </Box>
    )
}
