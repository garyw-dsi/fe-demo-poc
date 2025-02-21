"use client";

import { Button, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react"
import { modules } from "@/constants/modules";
import { useRouter } from "next/navigation";
import { components } from "@/libs/api/schema/uam";
import { userCanAccessApplication } from "@/utils/permissions-handler";
import { Fragment, useTransition } from "react";
import ScreenTransitionLoading from "@/components/screen-loading";

interface Modules {
  name: string;
  icon: React.ElementType;
  route: string;
  disabled?: boolean;
}

const Application = ({ name, icon, route, disabled }: Modules) => {
  const router = useRouter();
  const [pending, screenTransition] = useTransition();

  const onHref = () => {
    screenTransition(() => {
      router.push(route)
    })
  }

  return (
    <Fragment>
      <ScreenTransitionLoading pending={pending} />
      <Button
        variant={'unstyled'}
        flexDirection={'column'}
        alignItems={'center'}
        w={20}
        h={'fit-content'}
        cursor="pointer"
        onClick={onHref}
        isDisabled={disabled}
      >
        <Flex
          w={'full'}
          p={3}
          border={'1px'}
          borderColor={useColorModeValue('gray.300', 'gray.700')}
          bg={useColorModeValue('white', 'gray.800')}
          _hover={{
            bg: useColorModeValue('gray.100', 'gray.900'),
            borderColor: useColorModeValue('gray.300', 'gray.700')
          }}
          transition={'all 0.3s'}
          rounded={'md'}
          align={'center'}
          justify={'center'}
        >
          <Icon as={icon} boxSize={{ base: 10, md: 14 }} />
        </Flex>
        <Text fontSize={'sm'} textAlign={'center'} pt={1}>
          {name}
        </Text>
      </Button>
    </Fragment>
  )
}

export default function ModulesHomeApplication({
  canAccessApp
}: {
  canAccessApp: components['schemas']['Permission'][]
}) {
  return (
    <Flex
      direction={'column'}
      maxW={{ base: "full", lg: '4xl' }}
      px={{ md: 10 }}
      py={{ base: 5, md: 8 }}
      rounded={'md'}
      gap={{ base: 8 }}
      align={'center'}
    >
      <Flex>
        <Text
          fontSize={{ base: 'lg', md: 'xl' }}
          fontWeight={'bold'}
          color={useColorModeValue('gray.800', 'gray.100')}
        >
          My Applications
        </Text>
      </Flex>

      <Flex
        gap={{ base: 8, md: 10 }}
        flexWrap={'wrap'}
        justify={{ base: 'center' }}
        align={{ md: 'center' }}
      >
        {modules.map((module, index) => {
          return (
            <Application key={index}
              {...module}
              disabled={!userCanAccessApplication(
                canAccessApp,
                module.permission
              )}
            />
          )
        })}
      </Flex>
    </Flex>
  )
}