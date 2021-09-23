import { Box, useColorModeValue } from '@chakra-ui/react'
import React, { ReactElement } from 'react'
import { Nav } from '../Nav'

export const Header: React.FC = (): ReactElement => {
  const bg = useColorModeValue('primary', '#2D3748')

  return (
    <Box
      backgroundColor="primary"
      borderBottomWidth="5px"
      borderBottomColor="primaryDark"
      borderBottomStyle="inset"
      bg={bg}
    >
      <Nav />
    </Box>
  )
}
