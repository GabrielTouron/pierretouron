import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  colors: {
    primary: '#000000',
    fill: '#ffe082',
  },
  config,
})

export default theme
