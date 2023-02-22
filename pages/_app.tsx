import "../styles/globals.css";
import { ChakraProvider, Container, Box } from "@chakra-ui/react";
import theme from "./../theme";
import { Header } from "../components/Header/Header";
import type { AppProps } from "next/app";
import { ReactElement } from "react";
import { BottomBar } from "../components/BottomBar";
import { Footer } from "../components/Footer";
import "../styles/globals.css";
import { snipcartApiKey} from './../api/snipcart';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Box position="relative" min-height="100vh" paddingBottom="250px">
          <Header />
          <Container margin="20px auto" maxWidth={{ base: "90%", md: "1100px" }} minHeight="100vh">
            <Component {...pageProps} />
            <Box hidden id="snipcart" data-api-key={snipcartApiKey}></Box>
          </Container>
          <BottomBar />
          <Footer />
        </Box>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
