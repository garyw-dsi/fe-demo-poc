"use client"

import { Button, Flex, Icon, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { moduleMap, ModuleName } from "@/constants/modules";
import { moduleLinks } from "@/constants/modules/links";

import SidebarHeader from "@/components/sidebar/header";
import SidebarLinks from "@/components/sidebar/links";
import { useRouter } from "next/navigation";

export default function Sidebar({
  module, submodules
}: Readonly<{
  module: ModuleName;
  submodules: string[];
}>) {
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });

  const name = moduleMap[module];
  const links = moduleLinks[module];

  return (
    <Flex
      minW={isOpen ? '17rem' : '4.5rem'}
      direction={'column'}
      p={5}
      bg={useColorModeValue("white", "gray.800")}
      transition={'all .5s'}
      align={isOpen ? 'flex-start' : 'center'}
      borderEnd={'1px'}
      borderEndColor={useColorModeValue("gray.200", "gray.700")}
      display={{
        base: 'none',
        md: 'flex'
      }}
      justify={'space-between'}
    >
      <Flex
        w={'full'}
        direction={'column'}
        pos={'sticky'}
        top={5}
        gap={7}
      >
        <Flex
          align={'center'}
          justify={isOpen ? 'space-between' : 'center'}
          pos={'relative'}
          w={'full'}
        >
          <SidebarHeader isOpen={isOpen} module={name} />
          <Button
            pos={'absolute'}
            variant={'solid'}
            right={-8}
            top={2}
            size={'xs'}
            rounded={'full'}
            onClick={onToggle}
            p={0}
          >
            {isOpen
              ? <Icon as={FaChevronLeft} boxSize={3} />
              : <Icon as={FaChevronRight} boxSize={3} />
            }
          </Button>
        </Flex>

        <Flex
          direction={'column'}
          gap={2}
          w={'full'}
          align={isOpen ? 'self-start' : 'center'}
        >
          {links.map((link, index) => (
            (
              submodules.includes(link.submodule as string) ||
              link.submodule === null
            ) &&
            <SidebarLinks
              isOpen={isOpen}
              key={index}
              link={link}
            />
          ))}
        </Flex>
      </Flex>

      <Flex w={"full"} pos={'sticky'} bottom={5}>
        <Button
          size={'sm'}
          fontSize={'xs'}
          colorScheme={'gray'}
          leftIcon={<Icon as={FaChevronLeft} />}
          w={"full"}
          onClick={() => router.push("/modules")}
        >
          {isOpen ? "Home Menu" : null}
        </Button>
      </Flex>
    </Flex>
  )
}