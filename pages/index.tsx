import { Box, Flex, Heading } from '@chakra-ui/react'
import { ReactElement } from 'react'

export default function Home(): ReactElement {
  return (
    <>
      <Box>
        <Flex>
          <Heading alignContent="center">Home Page</Heading>
        </Flex>
      </Box>
    </>
  )
}
