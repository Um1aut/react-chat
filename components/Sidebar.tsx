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
    Link
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
                        console.log("success")
                        setState(doc.data().name)
                    }
                });
            }
    }
    AuthStateChange()
    getfromdb()
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            w={navSize == "small" ? "75px" : "400px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large");

                        else
                            changeNavSize("small");
                    } } aria-label={''}                />
                <NavItem navSize={navSize} title="Марк" icon={undefined} description={undefined} active={undefined} />
            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        {sign ? (<Heading as="h3" size="sm">{docState}</Heading>) : (<Text text-align="center " fontSize="14px">Don't have an account? <a href="/signup">Sign up</a> </Text> )}
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}