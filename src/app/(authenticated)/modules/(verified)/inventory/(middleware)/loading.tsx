import { Flex, Skeleton } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex w={'full'} p={5} direction={'column'} gap={8}>
      <Flex w={'full'} gap={8}>
        <Skeleton w={'full'} h={'32'} rounded={'md'} />
        <Skeleton w={'full'} h={'32'} rounded={'md'} />
      </Flex>

      <Flex w={'full'} flexWrap={'wrap'} gap={5} align={'center'}>
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