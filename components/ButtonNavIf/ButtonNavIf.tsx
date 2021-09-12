import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import React from "react";

interface Props {
  ifHomeBtn: boolean
  children: any
  onClick: VoidFunction
}

export const ButtonNav: React.FC<Props> = ({ifHomeBtn, children, onClick}: Props) => {
  const navButtonColor = useColorModeValue("blackAlpha", "white")

  const baseButtonNavProps: ButtonProps = {
    variant:"ghost",
    colorScheme: navButtonColor,
    onClick
  }

  if (ifHomeBtn) {
    return (
      <Button
        size="lg"
        fontWeight="bold" 
        {...baseButtonNavProps}
        >
          {children}
        </Button>
    )
  }

  return (
    <Button
        size="md"
        {...baseButtonNavProps}
    >
          {children}
    </Button>
  )
}