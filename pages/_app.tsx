import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './../theme'
import { Header } from '../components/Header/Header'
import type { AppProps } from 'next/app'
import { ReactElement } from 'react'

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <div className="container al">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  )
}

export default MyApp
