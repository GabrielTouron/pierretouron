import { Box } from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/system";
import { useMaxScroll } from "../../hooks/useMaxScroll";
import { NavMobile } from "../Nav";
import { Token } from "@chakra-ui/styled-system/dist/declarations/src/utils";
import * as CSS from "csstype";
import { useEffect, useState } from "react";
import { NavMobileExtra } from "../Nav/NavMobileExtra";

export const BottomBar: React.FC = () => {
  const bg = useColorModeValue("primary", "#2D3748");
  const isMaxScroll = useMaxScroll();

  const bottomBarConfig = () => {
    const contentHeight = 110;
    const base = contentHeight + 10;
    const revelead = 0;
    const hidden = -(3 * base);
    const fmt = (nbr: number) => `${nbr}px`;
    return {
      contentHeight: fmt(contentHeight),
      base: fmt(-base),
      revelead: fmt(revelead),
      hidden: fmt(hidden),
    };
  };
  const { base, hidden, contentHeight } = bottomBarConfig();
  const [bottomBar, setBottomBar] = useState<Token<CSS.Property.Bottom | number, "sizes">>(base);
  // const [setBottomArrow] = useState<Token<CSS.Property.Bottom | number, "sizes">>("3");

  useEffect(() => {
    isMaxScroll ? setBottomBar(hidden) : setBottomBar(base);
    // isMaxScroll ? setBottomArrow("-100px") : setBottomArrow("3");
  }, [isMaxScroll]);

  return (
    <Box
      paddingX="5"
      flexDir="column"
      display={{ base: "flex", md: "none" }}
      backgroundColor="primary"
      borderBottomWidth="5px"
      borderBottomColor="primaryDark"
      borderBottomStyle="inset"
      bg={bg}
      position="fixed"
      bottom={bottomBar}
      left="0"
      right="0"
      margin-bottom="0"
      transition={"bottom 0.3s"}
      zIndex="300"
    >
      <NavMobile height={contentHeight} />


      <NavMobileExtra height={contentHeight} />
    </Box>
  );
};
