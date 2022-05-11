import React from 'react'
import {  
  Flex,
  } from '@chakra-ui/react'

import {
  useColorMode,
} from '@chakra-ui/react'

const bgColor = {
        light: 'white',
        dark: 'gray.650'
    }

    const color = {
        light: 'black',
        dark: 'white'
    }


const Content = ({children}) => {
  const {colorMode} = useColorMode()

  return(
    <Flex
                as="main"
                justifyContent="center"
                flexDirection="column"
                bg={bgColor[colorMode]}
                color={color[colorMode]}
            >
                {children}
            </Flex>
  )
}

export default Content
