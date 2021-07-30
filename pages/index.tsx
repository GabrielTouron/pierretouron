import { Box, Flex, Text, Heading, Button } from '@chakra-ui/react'
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
    }
    createdAt
  }
  contentHomePage {
    presentation(locale: fr)
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
      <Heading alignContent="center" size="2xl">Pierre Touron</Heading>
      <Box maxW="570px" m="40px">
        <Text>
         {data.contentHomePage.presentation}
        </Text>
      </Box>

      <Flex>
        <Button mr="3" onClick={() => router.push('/search')}>
          Accéder au catalogue
        </Button>
        <Button ml="3" variant="link">Accéder au Blog --{'>'} </Button>
      </Flex>
      <Flex mt="10">      
          <Product
            id={product.id}
            categories={product.categories}
            imageUrl={product.image.url}
            name={product.name}
            price={product.price}
            state={product.state.name}
            isInHomePage={true}
          >
          </Product>
      </Flex>
    </Flex>
    </>
  )
}
