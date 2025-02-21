"use client"

import { Avatar, Divider, Flex, Icon, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { BsXCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";

import { formatStandardTime } from "@/utils/parsing-time";

import { components } from "@/libs/api/schema/uam";

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

export default function ModuleUAMUserDetail({
  data
}: {
  data: components['schemas']['User']
}) {
  const name = `${data.first_name} ${data.last_name}`;
  return (
    <Flex
      bg={useColorModeValue('white', 'gray.800')}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={"md"}
      w={'full'}
      p={5}
      direction={'column'}
      gap={5}
    >

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
        <DetailLabel label="Group" />
        <Text
          as={Link}
          href={`/modules/uam/groups/detail/${data.group?.pk}`}
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
        <DetailLabel label="Lock Status" />
        <Tag
          colorScheme={data.is_locked ? 'yellow' : 'green'}
          variant="solid"
          w={'fit-content'}
        >
          {data.is_locked ? 'Locked' : 'Unlocked'}
        </Tag>
      </Stack>

      <Stack spacing={1}>
        <DetailLabel label="Active Status" />
        <Tag
          colorScheme={data.is_active ? 'blue' : 'red'}
          variant="solid"
          w={'fit-content'}
        >
          {data.is_active ? 'Active' : 'Inactive'}
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
    </Flex>
  )
}