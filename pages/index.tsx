import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { fetchHomePageData } from "../api/product";
import { Button } from "../components/Button";
import { ProductCard } from "../components/ProductCard";
import { ProductsFragment } from "../graphql/generated";
// import homePage from "../api/product/query/homePage.json";
//

type HomeProps = {
  product: ProductsFragment;
  textPresentation: string;
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  // if (!isLocalhost) {
  const { product, textPresentation } = await fetchHomePageData();
  return { props: { product, textPresentation } };
  // }

  // const { data } = homePage;
  // const product = data.allProducts[0];
  // const textPresentation = data.contentHomePage.textPresentation;
  //
  // return {
  //   props: { product, textPresentation },
  // };
};

export default function Home({ product, textPresentation }: HomeProps): ReactElement {
  const router = useRouter();

  return (
    <>
      <Flex flexDirection="column" alignItems="center">
        <Heading alignContent="center" size="2xl">
          pierre touron
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
