"use client"

import { Flex, FormControl, Stack } from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputHelper, ModuleInputLabel } from "@/components/modules/input";
import UAMGroupSelect from "@/components/modules/uam/group/select";
import { CreateEmployee } from "@/libs/yup/hr/employees";
import ModuleHREmployeeFormLayout from "../layout";

export default function ModuleHREmployeeInformationCreate({
  profilePicture,
  initialGroups
}: {
  profilePicture: React.ReactNode;
  initialGroups: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const { errors, touched } = useFormikContext<CreateEmployee>();
  return (
    <ModuleHREmployeeFormLayout
      title="Employee Information"
    >
      <Flex
        gap={5}
        direction={{ base: 'column', lg: 'row' }}
      >
        {profilePicture}
        <Stack spacing={5} w={'full'}>
          <Flex
            gap={5}
            direction={{ base: 'column', lg: 'row' }}
          >
            <FormControl
              isRequired
              isInvalid={!!errors.first_name && touched.first_name}
            >
              <ModuleInputLabel label="First Name" />
              <Field
                as={ModuleInput}
                name="first_name"
                placeholder="First Name"
              />
              <ModuleInputErrorMessage value={errors.first_name} />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!errors.last_name && touched.last_name}
            >
              <ModuleInputLabel label="Last Name" />
              <Field
                as={ModuleInput}
                name="last_name"
                placeholder="Last Name"
              />
              <ModuleInputErrorMessage value={errors.last_name} />
            </FormControl>
          </Flex>
          <Flex
            gap={5}
            direction={{ base: 'column', lg: 'row' }}
          >
            <FormControl
              isRequired
              isInvalid={!!errors.email && touched.email}
            >
              <ModuleInputLabel label="Email" />
              <Field
                as={ModuleInput}
                name="email"
                placeholder="example@mail.com"
                type="email"
              />
              <ModuleInputHelper helper="Make sure to use a valid email address." />
              <ModuleInputErrorMessage value={errors.email} />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={!!errors.group_id && touched.group_id}
            >
              <ModuleInputLabel label="Department" />
              <UAMGroupSelect
                fieldName="group_id"
                initialOptions={initialGroups}
                placeholder="Select Department"
              />
              <ModuleInputErrorMessage value={errors.group_id} />
            </FormControl>
          </Flex>
        </Stack>
      </Flex>
    </ModuleHREmployeeFormLayout>
  )
}