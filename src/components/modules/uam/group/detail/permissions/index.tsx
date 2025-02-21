"use client"

import { components } from "@/libs/api/schema/uam";
import { groupPermissions } from "@/utils/grouping-permissions";
import { Button, Divider, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import NoPermission from "./no-permission";
import ModuleUAMPermissionHeader from "@/components/modules/uam/group/permission/header";
import { useParams, useRouter } from "next/navigation";

const PermissionItem = ({
  actions,
}: {
  actions: { pk: number, action: string }[];
}) => {
  return (
    <Flex gap={2} flexWrap={'wrap'}>
      {actions.map((action) => (
        <Button key={action.pk}
          size={'sm'}
          colorScheme="blue"
          fontSize={'xs'}
          rounded={'md'}
          cursor={'default'}
        >
          {action.action}
        </Button>
      ))}
    </Flex>
  )
}

export default function ModuleUAMGroupPermissionInformation({
  permissions
}: {
  permissions: components['schemas']['Permission'][]
}) {
  const router = useRouter();
  const params = useParams();

  const pk = params.pk
  const groupedPermissions = groupPermissions(permissions || []);

  return (
    <Flex
      bg={useColorModeValue("white", "gray.800")}
      border={"1px"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      rounded={"md"}
      w={"full"}
      p={5}
      direction={"column"}
      gap={5}
    >
      <ModuleUAMPermissionHeader
        actions={
          Object.keys(groupedPermissions).length > 0 && (
            <Button
              size={"sm"}
              fontSize={"xs"}
              colorScheme={"blue"}
              variant={'outline'}
              w={"fit-content"}
              onClick={() =>
                router.push(`/modules/uam/groups/create/${pk}/permission`)
              }
            >
              Edit Permission
            </Button>
          )
        }
      />
      <Stack spacing={2}>
        {Object.keys(groupedPermissions).length > 0
          ? (
            Object.entries(groupedPermissions).map(([app, modules]) => (
              <Stack key={app} spacing={4} divider={<Divider />}>
                {Object.entries(modules).map(([, submodules]) => (
                  Object.entries(submodules).map(([submodule, actions]) => (
                    <Stack key={submodule} spacing={2}>
                      <Text fontSize={'sm'} fontWeight={"bold"}>
                        {submodule}
                      </Text>
                      <PermissionItem actions={actions} />
                    </Stack>
                  ))
                ))}
              </Stack>
            ))
          )
          : <NoPermission />
        }
      </Stack>
    </Flex>
  )
}
