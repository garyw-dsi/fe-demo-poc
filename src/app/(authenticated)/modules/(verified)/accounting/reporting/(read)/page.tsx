import { Flex } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

export default async function ModuleAccountingReportingReadPage() {
  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <Flex flex={1} align={'center'} justify={'center'}>
        On Development
      </Flex>
    </Flex>
  )
}