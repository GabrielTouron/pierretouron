import { ReactElement } from "react";

export type ButtonProps = {
  children?: string | ReactElement;
  onClick?: VoidFunction;
  className?: string;
};
