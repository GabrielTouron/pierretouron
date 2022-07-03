import { Heading, Center } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface Props {}

export default function About(): ReactElement {
  return (
    <Center>
      <Heading>À propos</Heading>
    </Center>
  );
}
