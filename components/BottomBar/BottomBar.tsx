import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useMaxScroll } from "../../hooks/useMaxScroll";
import { Nav } from "../Nav";

export const BottomBar: React.FC = () => {
  const bg = useColorModeValue("primary", "#2D3748");
  const isMaxScroll = useMaxScroll();

  return (
    <Box
      display={{ md: "none" }}
      backgroundColor="primary"
      borderBottomWidth="5px"
      borderBottomColor="primaryDark"
      borderBottomStyle="inset"
      bg={bg}
      position="fixed"
      bottom={isMaxScroll ? "-100px" : "0"}
      left="0"
      right="0"
      margin-bottom="0"
      transition="bottom 0.3s"
      zIndex="300"
    >
      tata
      <Nav />
    </Box>
  );
};
