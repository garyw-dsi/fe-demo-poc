import { Flex, Heading } from "@chakra-ui/react";

export const dynamic = 'force-static';

export default function HomePage() {
  return (
    <Flex
      w={'full'}
      minH={'100dvh'}
      align={'center'}
      justify={'center'}
    >
      <Heading>
        SYMBOLIX COMING SOON...
      </Heading>
    </Flex>
  )
}