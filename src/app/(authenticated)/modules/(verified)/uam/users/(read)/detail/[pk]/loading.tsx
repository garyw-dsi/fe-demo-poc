import { Flex, Skeleton } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex gap={8} w={'full'} direction={'column'} p={5}>
      <Flex w={'full'} justify={'space-between'}>
        <Skeleton
          w={'lg'}
          h={'30rem'}
          rounded={'md'}
        />
        <Flex direction={'column'} gap={5}>
          {Array.from({ length: 2 }).map((_, index) => (
            <Skeleton key={index}
              w={'md'}
              h={24}
              rounded={'md'}
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  )
}