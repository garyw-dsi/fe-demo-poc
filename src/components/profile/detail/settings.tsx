"use client";

import { Divider, Stack, Text, useColorMode, Button, ButtonGroup } from "@chakra-ui/react";

export default function DetailProfileSettings() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Stack divider={<Divider />} spacing={4}>
      <Stack spacing={2}>
        <Text fontWeight="bold">
          Theme
        </Text>
        <ButtonGroup isAttached>
          <Button
            variant={colorMode === "light" ? "solid" : "outline"}
            onClick={toggleColorMode}
            size={'sm'}
            w={{ base: 'full', md: '32' }}
            fontSize={'xs'}
            colorScheme="blue"
          >
            Light
          </Button>
          <Button
            variant={colorMode === "dark" ? "solid" : "outline"}
            onClick={toggleColorMode}
            size={'sm'}
            fontSize={'xs'}
            w={{ base: 'full', md: '32' }}
            colorScheme="blue"
          >
            Dark
          </Button>
        </ButtonGroup>
      </Stack>
    </Stack>
  )
}
