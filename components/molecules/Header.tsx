import {  MoonIcon, SunIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'

export const Header: React.FC = (): ReactElement => {
  const router = useRouter()
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue("primary", "#2D3748")
  const navButton = useColorModeValue("blackAlpha", "white")



  return (
    <Box backgroundColor="primary" borderBottomWidth="5px" borderBottomColor="primaryDark" borderBottomStyle="inset" bg={bg}>
      <Flex
        justifyContent="space-between"
        className="container"
        m="0 auto"
        p="5"
      >
        <Button
          variant="ghost"
          size="lg"
          fontWeight="bold"
          onClick={() => router.push('/')}
          colorScheme={navButton}
        >
          Accueil
        </Button>
        <Stack
          spacing={2}
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
          isInline
        >
          <Button
            variant="ghost"
            size="md"
            colorScheme={navButton}

            onClick={() => router.push('/search')}
          >
            Catalogue
          </Button>
          {/* <Button
            variant="ghost"
            size="md"
            colorScheme={navButton}

            onClick={() => router.push('/blog')}
          >
            Blog
          </Button> */}
          {colorMode === "dark" ?
            <Button  onClick={toggleColorMode} colorScheme={navButton} variant="ghost">
              <SunIcon />
            </Button>
             :
            <Button  onClick={toggleColorMode} colorScheme={navButton} variant="ghost">
              <MoonIcon />
            </Button>
          }
        </Stack>
      </Flex>
    </Box>
  )
}
