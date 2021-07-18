import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { request } from "../../lib/datocms";

const Product = ({ data }) => {
  const router = useRouter()

  return (
    <>
      <Heading>Produit {router.query.slug}</Heading>
      {/* <div>{data.name}</div> */}
    </>
  )

}

export default Product