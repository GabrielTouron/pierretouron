import { Icon } from "@chakra-ui/icons";
import React from "react";

interface Props {
  boxSize: number;
  color: string;
}

export const CircleIcon = (props: Props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path fill="currentColor" d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0" />
  </Icon>
);
