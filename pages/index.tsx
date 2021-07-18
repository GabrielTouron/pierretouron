import { request } from "../lib/datocms";
import { Box, Flex, Heading, Button } from "@chakra-ui/react"
import { useRouter } from "next/router";

export default function Home({ data }) {

  const router = useRouter()

  return (
    <>
      <Box>
        <Flex>
          <Heading alignContent='center'>Home Page</Heading>
        </Flex>
      </Box>
    </>
  );
}