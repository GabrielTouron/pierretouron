import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

export const ButtonBack: React.FC = () => {
  const router = useRouter();

  return (
    <IconButton
      display={{ base: "none", md: "block" }}
      aria-label="Back to search page"
      size="lg"
      my="5"
      icon={<ArrowBackIcon />}
      onClick={() => router.back()}
    />
  );
};
