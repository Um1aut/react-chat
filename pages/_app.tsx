import { ChakraProvider, ColorModeProvider, useColorMode } from '@chakra-ui/react'
import customTheme from '../styles/theme.js'
import { Global, css } from '@emotion/react'

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
            background: ${colorMode === 'light' ? 'white' : 'gray.650'};
          }
        `}
      />
      {children}
    </>
  )
}

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <ColorModeProvider 
      options={{
        initialColorMode: "dark",
        useSystemColorMode: true,
      }}
    >
      <GlobalStyle>
        <Component {...pageProps} />
      </GlobalStyle>
      </ColorModeProvider>
    </ChakraProvider>
  ) 
}

export default MyApp
