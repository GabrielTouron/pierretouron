import { useColorModeValue } from "@chakra-ui/system";
import {Button as ChakraButton} from "@chakra-ui/react"
import React from "react";

interface Props {
  children: any
  onClick: VoidFunction
}

export const Button: React.FC<Props> = ({children, onClick}: Props) => {
  const navButtonColor = useColorModeValue("black", "black")

  return (
    <ChakraButton
      onClick={onClick}
      bg="primary"
      textColor={navButtonColor}
      _hover={{ bg: "primary" }}
    >
      {children}
    </ChakraButton>
  ) 
}