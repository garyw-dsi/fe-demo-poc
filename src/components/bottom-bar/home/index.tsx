"use client"

import { Flex, useColorModeValue } from "@chakra-ui/react";
import { HomeLinks } from "@/constants/modules/links/home";
import BottomNavigationLinksHome from "@/components/bottom-bar/home/links";

export default function BottomNavigationBarHome() {
  return (
    <Flex pt={{ base: 12, md: 0 }}>
      <Flex
        w={'full'}
        pos={"fixed"}
        bottom={0}
        zIndex={999}
        display={{ base: "flex", md: "none" }}
        bg={useColorModeValue("white", "gray.800")}
        borderTop={'1px'}
        borderTopColor={useColorModeValue("gray.200", "gray.700")}
        py={3} px={8}
        justify={"space-between"}
        align={'center'}
      >
        {HomeLinks.map((link, index) => (
          <BottomNavigationLinksHome key={index}
            icon={link.icon}
            label={link.name}
            route={link.route}
          />
        ))}
      </Flex>
    </Flex>
  )
}