"use client"

import { Button, Flex, Icon, SlideFade, Stack, useDisclosure } from "@chakra-ui/react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ModulesHomeApplicationFeedTransition({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  return (
    <Stack spacing={5} w={'full'} px={{ base: 0, md: 0 }}>
      <Flex
        align={'center'}
        justify={'center'}
        display={{ base: 'none', md: 'flex' }}
      >
        <Button
          variant={'link'}
          onClick={onToggle}
          rightIcon={
            <Icon as={
              isOpen
                ? FaChevronUp
                : FaChevronDown
            } />
          }
        >
          {isOpen
            ? "Hide Home Feeds"
            : "Show Home Feeds"
          }
        </Button>
      </Flex>

      <SlideFade
        in={isOpen}
        unmountOnExit={true}
      >
        {children}
      </SlideFade>
    </Stack>
  )
}