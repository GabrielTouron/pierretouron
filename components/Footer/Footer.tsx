import { Box, List, Link, ListItem, Center, useColorModeValue, Button } from "@chakra-ui/react";
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
              <Link textDecoration="none !important" href="https://fr-fr.facebook.com/pierre.touron.5/" isExternal>
                <Button colorScheme="facebook" leftIcon={<FaFacebook />}>
                  Facebook
                </Button>
              </Link>
            </Center>
          </ListItem>
          <ListItem>
            <Center>
              <Link textDecoration="none !important" href="https://instagram.com/pierre_touron?igshid=YmMyMTA2M2Y=" isExternal>
                <Button colorScheme="pink" leftIcon={<FaInstagram />}>
                  Instagram
                </Button>
              </Link>
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
