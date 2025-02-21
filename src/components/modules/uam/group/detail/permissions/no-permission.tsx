import { Button, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";

export default function NoPermission() {
  const router = useRouter();
  const params = useParams();

  const pk = params.pk

  return (
    <Flex justify={"space-between"} align={"center"} pt={5}>
      <Text fontSize={"xs"} color={useColorModeValue("gray.500", "gray.300")}>
        No permission found
      </Text>
      <Button
        size={"sm"}
        fontSize={"xs"}
        colorScheme={"blue"}
        w={"fit-content"}
        onClick={() =>
          router.push(`/modules/uam/groups/create/${pk}/permission`)
        }
      >
        Add Permission
      </Button>
    </Flex>
  )
}