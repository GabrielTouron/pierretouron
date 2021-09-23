import "../styles/globals.css";
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "./../theme";
import { Header } from "../components/Header/Header";
import type { AppProps } from "next/app";
import { ReactElement } from "react";
import { BottomBar } from "../components/BottomBar";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Container
        margin="0 auto"
        maxWidth={{ base: "90%", md: "1100px" }}
        margin-bottom={{ base: "150px", md: "0" }}
      >
        <Component {...pageProps} />
      </Container>
      <BottomBar />
    </ChakraProvider>
  );
}

export default MyApp;
