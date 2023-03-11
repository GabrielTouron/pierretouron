import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Stack } from "@chakra-ui/layout";
import { chakra, Flex, useColorMode, Image, Button, ButtonProps } from "@chakra-ui/react";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import router from "next/router";
import { useColorModeValue } from "@chakra-ui/color-mode";

export const Nav: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const navButtonColor = useColorModeValue("blackAlpha", "white");
  const shopButton = useColorModeValue("blackAlpha", "gold");

  const baseNavButtonProps: ButtonProps = {
    variant: "ghost",
    colorScheme: navButtonColor,
  };

  return (
    <Flex justifyContent="space-between" m="0 auto" p="5" maxWidth="1100px">
      <Button size="lg" fontWeight="bold" onClick={() => router.push("/")} {...baseNavButtonProps}>
        <Image
          borderRadius="full"
          boxSize="46"
          src="https://www.datocms-assets.com/48750/1670880137-rock.jpeg"
          alt="Dan Abramov"
          margin="0 10px"
        />
        Acceuil
      </Button>
      <Stack spacing={2} justifyContent="center" flexDirection="row" alignItems="center" isInline>
        <Button onClick={() => router.push("/search")} {...baseNavButtonProps}>
          Catalogue
        </Button>

        {colorMode === "dark" ? (
          <Button onClick={toggleColorMode} {...baseNavButtonProps}>
            <SunIcon />
          </Button>
        ) : (
          <Button onClick={toggleColorMode} {...baseNavButtonProps}>
            <MoonIcon />
          </Button>
        )}
        <Button
          className="snipcart-checkout snipcart-summary"
          variant="ghost"
          colorScheme={shopButton}
        >
          {
            <>
              <FaShoppingCart size={24} className="primary" />
              <chakra.span className="snipcart-items-count" marginLeft="5px"></chakra.span>
            </>
          }
        </Button>
      </Stack>
    </Flex>
  );
};
