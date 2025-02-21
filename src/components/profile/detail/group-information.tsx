"use client"

import { components } from "@/libs/api/schema/uam";
import { groupPermissions } from "@/utils/grouping-permissions";
import { Button, Divider, Flex, Stack, Text, useColorModeValue } from "@chakra-ui/react";

interface GroupInformation {
  group: {
    name: string | undefined;
    permissions: components["schemas"]["Permission"][] | undefined;
  };
}

const DetailLabel = ({ label }: { label: string }) => {
  return (
    <Text
      fontSize={'xs'}
      color={useColorModeValue('gray.500', 'gray.300')}
    >
      {label}
    </Text>
  )
}

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

export default function DetailProfileGroupInformation({
  group
}: GroupInformation) {
  const groupedPermissions = groupPermissions(group.permissions || []);

  return (
    <Stack spacing={5}>
      <Stack spacing={0}>
        <DetailLabel label="Group Name" />
        <Text>
          {group.name}
        </Text>
      </Stack>

      <Stack spacing={2}>
        <DetailLabel label="My Permissions" />
        {Object.keys(groupedPermissions).length > 0
          ? (Object.entries(groupedPermissions).map(([app, modules]) => (
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
          )))
          : <Text>No permissions</Text>
        }
      </Stack>
    </Stack>
  )
}
