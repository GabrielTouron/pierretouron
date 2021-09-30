import { Theme } from "@chakra-ui/react";

// type StyleInterpolation = StyleObjectOrFn | ((options: StyleObjectOrFn) => StyleObjectOrFn);

interface StyleOptions {
  theme: Theme;
  colorMode: "light" | "dark";
  colorScheme: string;
}

// interface StyleConfig {
//   baseStyle: StyleInterpolation;
//   sizes: { [size: string]: StyleInterpolation };
//   variants: { [variant: string]: StyleInterpolation };
//   defaultProps?: {
//     variant: string;
//     size: string;
//   };
// }

export const components = {
  CustomNavButton: {
    baseStyle: ({ colorMode }: StyleOptions) => ({
      bg: colorMode === "dark" ? "green.300" : "green.500",
      color: colorMode === "dark" ? "gray.800" : "white",
    }),
  },
};
