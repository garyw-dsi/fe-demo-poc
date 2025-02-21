"use client"

import { components } from "@/libs/api/schema/uam";
import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Divider, Flex, Icon, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { BsXCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import ModuleHREmployeeFormLayout from "../layout";

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

export default function ModuleHREmployeeDetail({
  data
}: {
  data: components['schemas']['User']
}) {
  const name = `${data.first_name} ${data.last_name}`;

  const getEmploymentStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return 'blue';
      case "Running":
        return 'green';
      case "Terminated":
        return 'red';
      case "Extended":
        return 'yellow';
      default:
        return 'gray';
    }
  };

  return (
    <ModuleHREmployeeFormLayout title="Employee Information">
      <Stack spacing={5}>
        <Flex align={'center'} gap={5}>
          <Avatar
            name={name}
            rounded={'md'}
            src={data.image.url || undefined}
          />
          <Text fontWeight={'bold'} fontSize={'lg'}>
            {name}
          </Text>
        </Flex>

        <Divider />

        <Stack spacing={0}>
          <DetailLabel label="Email" />
          <Text>
            {data.email}
          </Text>
        </Stack>

        <Stack spacing={0} w={'fit-content'}>
          <DetailLabel label="Department" />
          <Text
            as={Link}
            href={`/modules/hr/departments/detail/${data.group?.pk}`}
            _hover={{
              color: 'blue.500',
              textDecoration: 'underline'
            }}
          >
            {data.group?.name}
          </Text>
        </Stack>

        <Stack spacing={0}>
          <DetailLabel label="Organization" />
          <Text>
            {data.group?.organization.legal_name}
          </Text>
        </Stack>

        <Stack spacing={1}>
          <DetailLabel label="User Account" />
          <Tag
            colorScheme={data.is_locked ? 'yellow' : 'green'}
            variant="solid"
            w={'fit-content'}
          >
            {data.is_locked ? 'Locked' : 'Active'}
          </Tag>
        </Stack>

        <Stack spacing={1}>
          <DetailLabel label="Employment Status" />
          <Tag
            colorScheme={getEmploymentStatusColor(data.employment_status)}
            variant="solid"
            w={'fit-content'}
          >
            {data.employment_status}
          </Tag>
        </Stack>

        <Stack spacing={0}>
          <DetailLabel label="Status" />
          {data.is_verified
            ? (
              <Flex align={'center'} gap={4}>
                <Text color={'green.500'}>
                  Verified
                </Text>
                <Icon as={FaCheckCircle} color={'green.500'} />
              </Flex>
            )
            : (
              <Flex align={'center'} gap={4}>
                <Text color={'red.500'}>
                  Unverified
                </Text>
                <Icon as={BsXCircleFill} color={'red.500'} />
              </Flex>
            )
          }
        </Stack>
        <Stack spacing={0}>
          <DetailLabel label="Last Login At" />
          <Text>
            {formatStandardTime(data.last_login_at || "")}
          </Text>
        </Stack>
      </Stack>
    </ModuleHREmployeeFormLayout>
  )
}