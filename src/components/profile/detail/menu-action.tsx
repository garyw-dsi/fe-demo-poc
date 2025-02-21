"use client"

import { Button, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { BsChevronLeft } from "react-icons/bs";

export default function UserProfileMenuAction() {
  const router = useRouter();

  return (
    <Flex
      align={'center'}
      gap={3}
      flexWrap={'wrap-reverse'}
      display={{ base: "none", md: "flex" }}
    >
      <Button
        size={'sm'}
        fontSize={'xs'}
        bg={useColorModeValue('white', 'gray.700')}
        onClick={() => router.push("/modules")}
        leftIcon={
          <Icon as={BsChevronLeft} boxSize={3} />
        }
      >
        Back
      </Button>
      <Text fontSize={"sm"}>
        My Profile
      </Text>
    </Flex>
  )
}