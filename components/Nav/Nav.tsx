import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/layout";
import { chakra, Flex, useColorMode } from "@chakra-ui/react";
import router from "next/dist/client/router";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { NavButton } from "./NavButtonIf";

export const Nav: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent="space-between" m="0 auto" p="5" maxWidth="1100px">
      <NavButton onClick={() => router.push("/")} ifHomeBtn={true}>
        Accueil
      </NavButton>
      <Stack spacing={2} justifyContent="center" flexDirection="row" alignItems="center" isInline>
        <NavButton onClick={() => router.push("/search")} ifHomeBtn={false}>
          Catalogue
        </NavButton>
        {
          // <NavButton onClick={() => router.push("/about")} ifHomeBtn={false}>
          //   À propos
          // </NavButton>
        }

        {colorMode === "dark" ? (
          <NavButton onClick={toggleColorMode} ifHomeBtn={false}>
            <SunIcon />
          </NavButton>
        ) : (
          <NavButton onClick={toggleColorMode} ifHomeBtn={false}>
            <MoonIcon />
          </NavButton>
        )}
        <NavButton className="snipcart-checkout snipcart-summary" ifHomeBtn={false}>
          {
            <>
              <FaShoppingCart />
              <chakra.span className="snipcart-items-count" marginLeft="5px"></chakra.span>
            </>
          }
        </NavButton>
      </Stack>
    </Flex>
  );
};
