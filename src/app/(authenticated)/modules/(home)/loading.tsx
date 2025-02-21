import { Flex, Skeleton } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      align={'center'}
      justify={{ md: 'center' }}
      w={'full'}
      py={{ base: 12, md: 24 }}
      px={{ base: 5, md: 0 }}
      flexWrap={'wrap'}
    >
      <Flex
        gap={{ base: 10, md: 10 }}
        flexWrap={'wrap'}
        maxW={{ base: "full", md: "xl" }}
        justify={{ base: 'center' }}
        align={'center'}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index}
            w={20}
            h={20}
            rounded={"md"}
          />
        ))}
      </Flex>
    </Flex>
  )
}