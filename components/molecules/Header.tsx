import { CopyIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Stack } from "@chakra-ui/react";
import React from "react";
import { useRouter } from 'next/router'


interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = () => {

  const router = useRouter()

  return (
    <Box bgColor="white">
      <Flex justifyContent="space-between" className="container" m="0 auto" p="5">
        <Button variant="ghost" size="lg" fontWeight="bold" onClick={() => router.push('/')}>
          Acceuil
        </Button>
        <Stack
          spacing={2}
          justifyContent="center"
          flexDirection="row"
          alignItems="center"
          isInline
        >
          <Button variant="ghost" size="md" onClick={() => router.push('/search')}>
            Catalogue
          </Button>
          <Button variant="ghost" size="md" onClick={() => router.push('/blog')}>
            Blog
          </Button>
          <IconButton aria-label="icon" icon={<CopyIcon />} size="md" />
          <IconButton aria-label="icon" icon={<CopyIcon />} size="md" />
        </Stack>
      </Flex>
    </Box>
  )
}