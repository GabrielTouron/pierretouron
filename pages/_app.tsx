import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import theme from './../theme'
import { Header } from '../components/molecules/Header'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <div className="container al">
        <Component {...pageProps} />
      </div>
    </ChakraProvider>)
}

export default MyApp

