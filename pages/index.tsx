import { Box, Flex, Text, Heading } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Button } from "../components/Button";
import { ProductCard } from "../components/ProductCard";
import { request } from "../api/datocms";
import { HomePageQuery, HomePageDocument } from "./../graphql/generated";

type Props = {
  result: HomePageQuery;
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const result = await request<HomePageQuery>(HomePageDocument);
  return { props: { result } };
};

export default function Home({ result }: Props): ReactElement {
  const { allProducts, contentHomePage } = result;
  const product = allProducts[0];
  const textPresentation = contentHomePage?.textPresentation ?? "";
  const router = useRouter();

  return (
    <>
      <Flex flexDirection="column" alignItems="center">
        <Heading alignContent="center" size="2xl">
          Pierre Touron test
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
