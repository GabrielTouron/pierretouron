import { Box, Flex, Text, Heading, Button, useColorModeValue } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { fetchHomePageData } from '../api/product'
import { Product } from '../components/Product'

export const getStaticProps: GetStaticProps = async () => {
  const {product, textPresentation } = await fetchHomePageData()
  
  return {
    props: { product, textPresentation },
  }
}

export default function Home({product, textPresentation }: any): ReactElement {
  const router = useRouter()
  const navButtonColor = useColorModeValue("black", "black")

  return (
    <>
     <Flex my="20px" flexDirection="column" alignItems="center">
      <Heading alignContent="center" size="3xl" mt="8">
        pierre touron
      </Heading>
      <Box maxW="570px" m="30px">
        <Text>
         {textPresentation}
        </Text>
      </Box>
      <Flex>
        <Button 
          mr="3"
          onClick={() => router.push('/search')}
          bg="primary"
          textColor={navButtonColor}
          _hover={{ bg: "primary" }}
        >
          Accéder au catalogue
        </Button>
        <Button ml="3" variant="link" >Accéder au Blog --{'>'} </Button>
      </Flex>
      <Flex mt="10">      
          <Product
            product={product}
            isInHomePage={true}
          >
          </Product>
      </Flex>
    </Flex>
    </>
  )
}
