import { Flex, Skeleton } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex gap={8} w={'full'} direction={'column'} p={5}>
      <Flex w={'full'} justify={'space-between'}>
        <Skeleton w={'32'} h={10} rounded={'md'} />
        <Skeleton w={'32'} h={10} rounded={'md'} />
      </Flex>

      <Flex w={'full'} direction={'column'} gap={5}>
        <Skeleton w={'full'} h={"20rem"} rounded={'md'} />
        <Skeleton w={'full'} h={"40rem"} rounded={'md'} />
      </Flex>
    </Flex>
  )
}