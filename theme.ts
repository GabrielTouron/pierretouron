import { extendTheme, ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const theme = extendTheme({
  colors: {
    primary: '#c4ffff',
    primaryDark: '#9ac9c6',
    secondary: '#fc8b4f',
  },
  config,
})

export default theme
