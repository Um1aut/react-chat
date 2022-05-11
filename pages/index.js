import Head from 'next/head'
import Navbar from '../components/Container.js'
import Content from '../components/home.js'
import Anim from '../components/section.js'
import Sidebar from '../components/Sidebar'

import { IconButton } from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'

import { useColorMode,
        Text,
        Heading,
        Flex,
        Stack,
        Container
} from '@chakra-ui/react'

export default function Index() {
  const {colorMode} = useColorMode()
  const colorSecondary = {
    light: 'gray.700',
    dark: 'gray.400'
  }
  return (
    <Anim>
    <Stack>
    <Navbar/>
    <Content>
      <Flex w="100%" mt="1em" maxWidth="700px">
      <Sidebar />
      <Flex
        pos="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
      >
        <Text>Click the
          <IconButton
            background="none"
            _hover={{ background: 'none' }}
            icon={<FiMenu />}
          />
        to resize the vertical navigation bar.</Text>
      </Flex>
    </Flex>
      <Text align="center">2022. All Rights are reserved</Text>
    </Content>
    </Stack>
    </Anim>
    )
}
