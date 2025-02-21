"use client"

import { components } from "@/libs/api/schema/uam";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import ModuleHRDepartmentFormLayout from "../layout";

export default function ModuleHRDepartmentDetail({
  data
}: {
  data: components['schemas']['Group']
}) {
  return (
    <ModuleHRDepartmentFormLayout title="Department Detail">
      <Flex direction={'column'}>
        <Text
          fontSize={'xs'}
          color={useColorModeValue('gray.500', 'gray.300')}
        >
          Department Name
        </Text>
        <Text fontWeight={'bold'} fontSize={'xl'}>
          {data.name}
        </Text>
      </Flex>
    </ModuleHRDepartmentFormLayout>
  )
}