import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { Stack } from "@chakra-ui/layout"
import { Flex, useColorMode } from "@chakra-ui/react"
import router from "next/dist/client/router"
import React from "react"
import { NavButton } from "../NavButtonIf"

export const Nav: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex
      justifyContent="space-between"
      className="container"
      m="0 auto"
      p="5"
    >
      <NavButton
        children="Accueil"
        onClick={() => router.push('/')}  
        ifHomeBtn={true}       
      />
      <Stack
        spacing={2}
        justifyContent="center"
        flexDirection="row"
        alignItems="center"
        isInline
      >
        <NavButton
          children="Catalogue"
          onClick={() => router.push('/search')}
          ifHomeBtn={false}
        />
          {
            colorMode === "dark" ?
            <NavButton
              onClick={toggleColorMode}
              ifHomeBtn={false}
              children={<SunIcon />}
            />
              :
            <NavButton
              onClick={toggleColorMode}
              ifHomeBtn={false}
              children={<MoonIcon />}
            />
          }
      </Stack>
    </Flex>
  )
}
