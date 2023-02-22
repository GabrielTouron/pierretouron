import React from "react";
import { chakra } from "@chakra-ui/react";

interface Props {
  boxSize?: string;
  src: string;
  alt: string;
  onClick?: VoidFunction;
  hasHover?: boolean;
}

export const ProductImage: React.FC<Props> = ({ boxSize, src, alt, onClick, hasHover }: Props) => {
  return (
    <chakra.img
      boxSize={boxSize}
      objectFit="cover"
      src={src}
      alt={alt}
      onClick={onClick}
      layerStyle={hasHover ? "hoverBase" : ""}
    />
  );
};
