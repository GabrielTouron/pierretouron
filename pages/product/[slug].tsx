import { Heading, Button, Box, Center, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { ButtonPrimary } from "../../components/atoms/buttons/ButtonPrimary";
import { request } from "../../lib/datocms";

const PRODUCT_QUERY = `query PorductBySlug($slug: String) {
  product(filter: {name: {eq: $slug}}) {
    name
    price
    state {
      name
    }
    description
    id
    categories {
      name
    }
    image {
      url
    }
  }
}`

export async function getStaticPaths() {
  const data = await request({ query: `{ allProducts { name } }` });

  return {
    paths: data.allProducts.map((product) => `/product/${product.name}`),
    fallback: false,
  };
}

export async function getStaticProps({params}) {
  const data = await request({
    query: PRODUCT_QUERY,
    variables: {slug: params.slug}
  });

  console.log(data);
  
  return {
    props: { data }
  };

}


const Product = ({ data }) => {
  const router = useRouter()


  return (
    <>
      <Center my="20px">
        <Heading alignContent='center'>{data.product.name}</Heading>
      </Center>
      <br />
      <Box>
        <Flex justifyContent="space-between">
          <Box width="421px" height="577px" border="1px">
          <Image
        boxSize="300px"
        objectFit="cover"
        src={data.product.image.url}
        alt="Segun Adebayo"
      />
          </Box>
          <Box width="421px" height="577px">
            <Box>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non iste veniam quibusdam provident, beatae nemo, corrupti, reiciendis incidunt hic blanditiis quisquam. Modi nisi eos impedit ea maiores, quis deserunt fugiat.</Box>
            <br />
            <Box><ButtonPrimary action={()=>console.log('ajouter au panier')}>AJOUTER AU PANIER</ButtonPrimary></Box>
          </Box>
        </Flex> 
      </Box>
      
    </>
  )

}

export default Product