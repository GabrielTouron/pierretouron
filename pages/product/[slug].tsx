import { Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Header } from "../../components/molecules/Header";

interface CatalogProps {

}

const Product = () => {
  const router = useRouter()

  return (
    <>
      <Heading>Produit {router.query.slug}</Heading>
    </>
  )

}

export default Product