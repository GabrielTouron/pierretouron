import { Box, List, ListItem, Center, useColorModeValue, Button } from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

export const Footer: React.FC = () => {
  const bg = useColorModeValue("primary", "#2D3748");

  return (
    <Box
      borderBottomWidth="5px"
      borderBottomColor="primaryDark"
      borderBottomStyle="inset"
      bg={bg}
      paddingY="30px"
      position="absolute"
      bottom="0"
      left="0"
      right="0"
    >
      <Center>
        <List spacing={5}>
          <ListItem margin="0 auto">
            <Center>
              <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
                Facebook
              </Button>
            </Center>
          </ListItem>
          <ListItem>
            <Center>
              <Button colorScheme="pink" leftIcon={<FaInstagram />}>
                Instagram
              </Button>
            </Center>
          </ListItem>
          <ListItem>
            <Center>Proudly made by Gabriel Touron</Center>
          </ListItem>
        </List>
      </Center>
    </Box>
  );
};
