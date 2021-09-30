import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface Props {
  ifHomeBtn: boolean;
  children?: string | ReactElement;
  onClick?: VoidFunction;
  className?: string;
}

export const NavButton: React.FC<Props> = ({ ifHomeBtn, children, onClick, className }: Props) => {
  const navButtonColor = useColorModeValue("blackAlpha", "white");

  const baseNavButtonProps: ButtonProps = {
    variant: "ghost",
    colorScheme: navButtonColor,
    onClick,
    className,
  };

  if (ifHomeBtn) {
    return (
      <Button size="lg" fontWeight="bold" {...baseNavButtonProps}>
        {children}
      </Button>
    );
  }

  return (
    <Button size="md" {...baseNavButtonProps}>
      {children}
    </Button>
  );
};
