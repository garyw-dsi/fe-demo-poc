"use client";

import { Field, useFormikContext } from "formik";
import { Button, ButtonGroup, Divider, Flex, FormControl, Stack } from "@chakra-ui/react";

import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";

import { EditUser } from "@/libs/yup/uam";
import ModuleUAMUserFormLayout from "@/components/modules/uam/user/layout";
import UAMGroupSelect from "@/components/modules/uam/group/select";
import ModuleUAMUserEmail from "./email";

interface ModuleUAMUserInformationEditProps {
  profilePicture: React.ReactNode;
  initialGroups: {
    value: string;
    label: string;
  }[] | undefined;
  defaultGroup: {
    value: string;
    label: string;
  }
}

export default function ModuleUAMUserInformationEdit({
  profilePicture,
  initialGroups,
  defaultGroup
}: ModuleUAMUserInformationEditProps) {
  const {
    errors,
    touched,
    values,
    setFieldValue,
    setTouched
  } = useFormikContext<EditUser>();

  const handleLockToggle = (isLocked: boolean) => {
    setFieldValue("is_locked", isLocked);
    setTouched({ is_locked: true });
  }

  const handleActiveToggle = (isActive: boolean) => {
    setFieldValue("is_active", isActive);
    setTouched({ is_active: true });
  }

  return (
    <ModuleUAMUserFormLayout
      title="User Information"
      action={
        <Flex 
          justify={'end'} 
          gap={5} 
          flexWrap={'wrap-reverse'}
        >
          <ButtonGroup isAttached>
            <Button
              colorScheme={values.is_locked ? 'red' : 'gray'}
              onClick={() => handleLockToggle(true)}
              size={'sm'}
              fontSize={'xs'}
            >
              Locked
            </Button>
            <Button
              colorScheme={!values.is_locked ? 'green' : 'gray'}
              onClick={() => handleLockToggle(false)}
              size={'sm'}
              fontSize={'xs'}
            >
              Unlocked
            </Button>
          </ButtonGroup>

          <ButtonGroup isAttached>
            <Button
              colorScheme={!values.is_active ? 'red' : 'gray'}
              onClick={() => handleActiveToggle(false)}
              size={'sm'}
              fontSize={'xs'}
            >
              Inactive
            </Button>
            <Button
              colorScheme={values.is_active ? 'blue' : 'gray'}
              onClick={() => handleActiveToggle(true)}
              size={'sm'}
              fontSize={'xs'}
            >
              Active
            </Button>
          </ButtonGroup>
        </Flex>

      }
    >
      <Flex
        gap={5}
        direction={{ base: 'column', lg: 'row' }}
      >
        {profilePicture}
        <Stack spacing={5} w={'full'} divider={<Divider />}>
          <ModuleUAMUserEmail email={values.email} />
          <Stack spacing={5}>
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
            <FormControl
              isRequired
              isInvalid={!!errors.group_id && touched.group_id}
            >
              <ModuleInputLabel label="Group" />
              <UAMGroupSelect fieldName="group_id"
                initialOptions={initialGroups}
                defaultValue={defaultGroup}
              />
              <ModuleInputErrorMessage value={errors.group_id} />
            </FormControl>
          </Stack>
        </Stack>
      </Flex>
    </ModuleUAMUserFormLayout>
  )
}