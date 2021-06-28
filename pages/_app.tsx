import "../styles/globals.css";
import { ChakraProvider, Container, Box } from "@chakra-ui/react";
import theme from "./../theme";
import { Header } from "../components/Header/Header";
import type { AppProps } from "next/app";
import { ReactElement } from "react";
import { BottomBar } from "../components/BottomBar";
import { Footer } from "../components/Footer";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  return (
    <>
      <Head key="snipcart">
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.css" />
      </Head>
      <ChakraProvider theme={theme}>
        <Box position="relative" min-height="100vh" paddingBottom="250px">
          <Header />
          <Container margin="20px auto" maxWidth={{ base: "90%", md: "1100px" }}>
            <Component {...pageProps} />
            <script async src="https://cdn.snipcart.com/themes/v3.2.0/default/snipcart.js"></script>
            <div hidden id="snipcart" data-api-key={process.env.NEXT_SNIPCART_API_TOKEN}></div>

            <button
              className="snipcart-add-item"
              data-item-id="starry-night"
              data-item-price="79.99"
              data-item-url="/paintings/starry-night"
              data-item-description="High-quality replica of The Starry Night by the Dutch post-impressionist painter Vincent van Gogh."
              data-item-name="The Starry Night"
            >
              Add to cart
            </button>
          </Container>
          <BottomBar />
          <Footer />
        </Box>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
