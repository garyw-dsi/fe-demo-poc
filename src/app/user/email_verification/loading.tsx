import { Flex, Spinner } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Flex
      w={'full'}
      minH={'100dvh'}
      justify={'center'}
      align={'center'}
    >
      <Spinner
        size={'sm'}
        colorScheme="blue"
      />
    </Flex>
  )
}