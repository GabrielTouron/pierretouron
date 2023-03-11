import { Button, ButtonProps, Image, useColorModeValue } from "@chakra-ui/react";
import React, { ReactElement } from "react";

type Props = {
  ifHomeBtn: boolean;
  children?: string | ReactElement;
} & ButtonProps;



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
        <Image
          borderRadius="full"
          boxSize="46"
          src="https://www.datocms-assets.com/48750/1670880137-rock.jpeg"
          alt="Dan Abramov"
          margin="0 10px"
        />

        {children}
      </Button>
    );
  }

  return (
    <Button {...baseNavButtonProps}>
      {children}
    </Button>
  );
};
