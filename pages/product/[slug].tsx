import { Heading, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
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
      <Heading>Produit {router.query.slug}</Heading>
      <Button onClick={() => console.log(data)}>test</Button>
    </>
  )

}

export default Product