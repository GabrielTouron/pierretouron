import { Box } from "@chakra-ui/layout";
import { useColorModeValue } from "@chakra-ui/system";
import React from "react";
import { Nav } from "../Nav";

export const BottomBar: React.FC = () => {
  const bg = useColorModeValue("primary", "#2D3748");
  return (
    <Box
      display={{ md: "none" }}
      backgroundColor="primary"
      borderBottomWidth="5px"
      borderBottomColor="primaryDark"
      borderBottomStyle="inset"
      bg={bg}
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      margin-bottom="0"
    >
      <Nav />
    </Box>
  );
};
