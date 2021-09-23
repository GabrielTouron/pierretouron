import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Stack } from '@chakra-ui/layout'
import { Flex, useColorMode } from '@chakra-ui/react'
import router from 'next/dist/client/router'
import React from 'react'
import { NavButton } from '../NavButtonIf'

export const Nav: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex justifyContent="space-between" className="container" m="0 auto" p="5">
      <NavButton
        onClick={() => router.push('/')}
        ifHomeBtn={true}
      >
        Accueil
      </NavButton>
      <Stack
        spacing={2}
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        isInline
      >
        <NavButton
          onClick={() => router.push('/search')}
          ifHomeBtn={false}
        >
          Catalogue
        </NavButton>

        {colorMode === 'dark' ? (
          <NavButton
            onClick={toggleColorMode}
            ifHomeBtn={false}
          >
            <SunIcon />
          </NavButton>
        ) : (
          <NavButton
            onClick={toggleColorMode}
            ifHomeBtn={false}
          >
            <MoonIcon />
          </NavButton>
        )}
      </Stack>
    </Flex>
  )
}
