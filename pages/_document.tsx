import { ColorModeScript, theme } from "@chakra-ui/react"
import Document, { Html, Head, Main, NextScript, DocumentInitialProps, DocumentContext } from "next/document"
import React from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) : Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument