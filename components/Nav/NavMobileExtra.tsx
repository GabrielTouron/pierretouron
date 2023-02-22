import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, useColorMode } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { NavButton } from "./NavButtonIf";
type Props = {
  height: string;
};

export const NavMobileExtra: React.FC<Props> = (props: Props) => {
  const { height } = props;
  const router = useRouter();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent="center" height={height}>  
      <NavButton onClick={() => router.push("/about")} ifHomeBtn={false}>
        À propos
      </NavButton>

      {colorMode === "dark" ? (
        <NavButton onClick={toggleColorMode} ifHomeBtn={false}>
          <SunIcon />
        </NavButton>
      ) : (
        <NavButton onClick={toggleColorMode} ifHomeBtn={false}>
          <MoonIcon />
        </NavButton>
      )}
    </Flex>
  );
};
