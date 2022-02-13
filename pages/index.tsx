import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { fetchHomePageData } from "../api/product";
import { Button } from "../components/Button";
import { ProductCard } from "../components/ProductCard";
import { Product } from "../domain/product";

type HomeProps = {
  product: Product;
  textPresentation: string;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { product, textPresentation } = await fetchHomePageData();

  return {
    props: { product, textPresentation },
  };
};

export default function Home({ product, textPresentation }: HomeProps): ReactElement {
  const router = useRouter();

  return (
    <>
      <Flex flexDirection="column" alignItems="center">
        <Heading alignContent="center" size="2xl">
          pierre touron remy
        </Heading>
        <Box maxW="570px" m="30px">
          <Text textAlign="center">{textPresentation}</Text>
        </Box>
        <Flex>
          <Button onClick={() => router.push("/search")}>Accéder au catalogue</Button>
        </Flex>
        <Flex mt="10">
          <ProductCard product={product} isInHomePage={true}></ProductCard>
        </Flex>
      </Flex>
    </>
  );
}
