import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

export default function ModuleUAMPermissionHeader({
  actions
}: {
  actions?: React.ReactNode;
}) {
  return (
    <Flex w={'full'} justify={'space-between'} align={'center'}>
      <Flex direction={"column"} gap={2}>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          Group Permission
        </Text>
        <Text fontSize={"xs"} color={useColorModeValue("gray.500", "gray.300")}>
          Permissions to access features on each module
        </Text>
      </Flex>
      {actions}
    </Flex>
  )
}