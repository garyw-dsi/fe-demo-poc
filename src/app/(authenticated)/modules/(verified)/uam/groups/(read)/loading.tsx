import { Flex, Skeleton } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex gap={8} w={'full'} direction={'column'} p={5}>
      <Flex w={'full'} justify={'space-between'}>
        <Skeleton w={'32'} h={10} rounded={'md'} />
        <Skeleton w={'32'} h={10} rounded={'md'} />
      </Flex>

      <Flex w={'full'} gap={8} flexWrap={'wrap'}>
        {Array.from({ length: 15 }).map((_, index) => (
          <Skeleton key={index}
            w={"10rem"}
            h={24}
            rounded={'md'}
          />
        ))}
      </Flex>
    </Flex>
  )
}