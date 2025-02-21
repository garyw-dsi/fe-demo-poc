"use client"

import { Module } from "@/constants/modules";
import { Flex, Icon, Text } from "@chakra-ui/react";

export default function SidebarHeader({
  isOpen,
  module
}: {
  isOpen: boolean;
  module: Module
}) {
  return (
    <Flex align={'center'} gap={4}>
      <Icon as={module.icon} boxSize={{ base: 4, md: 6 }} />
      {isOpen && (
        <Text fontWeight={'bold'} fontSize={{ base: "sm", md: "md" }}>
          {module.name}
        </Text>
      )}
    </Flex>
  )
}