"use client"

import { requestChangePassword } from "@/app/actions/user";
import { components } from "@/libs/api/schema/uam";
import { formatStandardTime } from "@/utils/parsing-time";
import { Button, Flex, Icon, Stack, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { BsXCircleFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { RxOpenInNewWindow } from "react-icons/rx";

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

export default function DetailProfileUserInformation({
  user
}: {
  user: components['schemas']['User']
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const name = `${user.first_name} ${user.last_name}`;
  const email = user.email;

  const onRequestChangePassword = async () => {
    setLoading(true);
    try {
      const response = await requestChangePassword({ email });
      if (response.status === 'success') {
        return toast({
          title: "Success",
          description: response.message,
          status: "success",
        });
      }

      return toast({
        title: "Error",
        description: response.message,
        status: "error",
      });
    } catch {
      return toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Stack spacing={5}>
      <Flex align={'center'} gap={5}>
        <Stack spacing={0}>
          <DetailLabel label="Name" />
          <Text>
            {name}
          </Text>
        </Stack>
      </Flex>
      <Stack spacing={0}>
        <DetailLabel label="Email" />
        <Text>
          {email}
        </Text>
      </Stack>
      <Stack spacing={0}>
        <DetailLabel label="User Action" />
        <Button
          variant="link"
          rightIcon={<Icon as={RxOpenInNewWindow} boxSize={5} />}
          w={'fit-content'}
          colorScheme="blue"
          onClick={onRequestChangePassword}
          isLoading={loading}
          loadingText="Processing your request..."
        >
          Change Password
        </Button>
      </Stack>
      <Stack spacing={0}>
        <DetailLabel label="Status" />
        {user.is_verified
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
        <DetailLabel label="Last Login at" />
        <Text>
          {formatStandardTime(user.last_login_at || "")}
        </Text>
      </Stack>
    </Stack>
  )
}