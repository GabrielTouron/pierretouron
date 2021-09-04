import { Box, Flex, Text, Heading, Button, useColorModeValue } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { Product } from '../components/molecules/Product'
import { request } from '../lib/datocms'
import { HomePage } from '../types'

const HOME_PAGE_QUERY = `query MyQuery {
  allProducts(orderBy: _createdAt_DESC, first: "1") {
    price
    name
    description
    id
    categories {
      name
    }
    image {
      url
    }
    state {
      name
      colorStatus {
        hex
      }
      available
    }
    createdAt
  }
  contentHomePage {
    textPresentation(locale: fr)
  }
}`

type HomePageRequest = {
  data: HomePage
}

export const getStaticProps: GetStaticProps = async () => {
  const data = await request({
    query: HOME_PAGE_QUERY,
  })
  return {
    props: { data },
  }
}

export default function Home({data}: HomePageRequest): ReactElement {
  const router = useRouter()
  const product = data.allProducts[0]


  return (
    <>
     <Flex my="20px" flexDirection="column" alignItems="center">
      <Heading alignContent="center" size="3xl" mt="8">
        pierre touron
      </Heading>
      <Box maxW="570px" m="30px">
        <Text>
         {data.contentHomePage.textPresentation}
        </Text>
      </Box>
      <Flex>
        <Button mr="3" onClick={() => router.push('/search')} backgroundColor="primary">
          Accéder au catalogue
        </Button>
        <Button ml="3" variant="link">Accéder au Blog --{'>'} </Button>
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
