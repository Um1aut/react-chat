import { Box, Button, ChakraProvider, ColorModeProvider, Progress, Spinner, useColorMode } from '@chakra-ui/react'
import customTheme from '../styles/theme.js'
import { Global, css } from '@emotion/react'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router.js';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons';

const GlobalStyle = ({children}) => {
  const { colorMode } = useColorMode()

  return (
    <>
      <Global
        styles={css`
          body {
            transition: bg 200ms linear
          }
          ::selection {
            background-color: #90CDF4;
            color: #fefefe;
          }
          ::-moz-selection {
            background: #ffb7b7;
            color: #fefefe;
          }
          html {
            min-width: 356px;
            scroll-behavior: smooth;
            transition-duration: 2s;
          }
          .css-1a1nmg2 {
            padding-top: 3em;
          }
          #__next {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            background: ${colorMode === 'light' ? 'white' : 'gray.450'};
          }
        `}
      />
      {children}
    </>
  )
}
function MyApp({ Component, pageProps }) {
  const [animationValue, setAnimationValue] = useState(0)
  const router = useRouter()
  
  React.useEffect(() => {
    const el = document.getElementById('progressBar')
    const handleStart = () => {
      // for(let i=0; i<=50; i++) {
      //   setTimeout(() => setAnimationValue(i+20), 1);
      // }
      setTimeout(() => el.style.visibility='visible', 50);
      setAnimationValue(30)
      setTimeout(() => setAnimationValue(60), 200);
    }
    const handleStop = () => {
      setTimeout(() => setAnimationValue(100), 400);
      setTimeout(() => setAnimationValue(0), 800);
      setTimeout(() => el.style.visibility='hidden', 800);
    }
  
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
  
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
    }
  }, [router])

  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ColorModeProvider 
      options={{
        initialColorMode: "dark",
        useSystemColorMode: true,
      }}
    >
        <GlobalStyle>
          <Progress sx={{"& > div:first-child": {transitionProperty: "width",}, visibility: "hidden"}} zIndex={3} size='xs' id='progressBar' colorScheme='blue' value={animationValue}></Progress>
          <Component {...pageProps} />
        </GlobalStyle>
      </ColorModeProvider>
    </ChakraProvider>
  ) 
}

export default MyApp
