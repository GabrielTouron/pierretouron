import { Box, chakra, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { NavButton } from "./NavButtonIf";

type Props = {
  height: string;
};

export const NavMobile: React.FC<Props> = (props: Props) => {
  const { height } = props;
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  return (
    <Flex justifyContent="space-between" paddingTop="3" height={height} maxWidth="1100px">
      <Box height={height} paddingTop="2.5">
        <Image
          boxShadow={isHomePage ? "outline" : "none"}
          onClick={() => router.push("/")}
          borderRadius="full"
          boxSize="2.2em"
          src="https://www.datocms-assets.com/48750/1670880137-rock.jpeg"
          alt="Dan Abramov"
          margin="0 10px"
        />
      </Box>
      <Box paddingTop="1.5">
        <NavButton onClick={() => router.push("/search")} ifHomeBtn={false}>
          Catalogue
        </NavButton>
      </Box>

      <Box paddingTop="1.5">
        <NavButton className="snipcart-checkout snipcart-summary" ifHomeBtn={false}>
          {
            <>
              <FaShoppingCart />
              <chakra.span className="snipcart-items-count" marginLeft="5px"></chakra.span>
            </>
          }
        </NavButton>
      </Box>
    </Flex>
  );
};
