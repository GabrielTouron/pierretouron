import { request } from "../lib/datocms";
import { Box, Flex, Heading } from "@chakra-ui/react"

const HOMEPAGE_QUERY = `query MyQuery {
  allProducts {
    name
    price
  }
}`;

export async function getStaticProps() {
  const data = await request({
    query: HOMEPAGE_QUERY,
    variables: { limit: 10 }
  });
  return {
    props: { data }
  };
}

export default function Home({ data }) {
  return (
    <>
    <Box>
      <Flex>
        <Heading alignContent='center'>Catalogue</Heading>
      </Flex>
    </Box>
    <Box>
      {JSON.stringify(data, null, 2)}
    </Box>
  </>
  );
}
