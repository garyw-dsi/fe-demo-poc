"use client"

import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, Text, useColorModeValue, Tag, Stack, } from "@chakra-ui/react";
import { Formik } from "formik";

import { components } from "@/libs/api/schema/uam";
import { setPermissionSchema } from "@/libs/yup/uam";
import { groupPermissions } from "@/utils/grouping-permissions";

import ModuleUAMGroupSetPermissionCheckbox from "./checkbox";
import SetPermissionSubmit from "./button";
import { FormState } from "@/libs/api/constants";
import { useFormState } from "react-dom";
import { setPermissions } from "@/app/actions/modules/uam/groups/permission";
import { useRouter, useParams } from "next/navigation";
import SuccessAlert from "@/components/alert/success";
import ModuleUAMPermissionHeader from "./header";

interface ModulesUAMGroupSetPermission {
  permissions: components["schemas"]["Permission"][];
  initialPermissions: components["schemas"]["Permission"][];
}

const SubmoduleTitle = ({ title }: { title: string }) => {
  return (
    <Text
      fontSize="sm"
      textTransform="capitalize"
      color={useColorModeValue('gray.500', 'gray.300')}
    >
      {title}
    </Text>
  )
}

export default function ModuleUAMGroupSetPermission({
  permissions,
  initialPermissions
}: ModulesUAMGroupSetPermission) {
  const params = useParams();
  const router = useRouter();

  const pk = params.pk;

  const groupedPermissions = groupPermissions(permissions);
  const initialPermissionPK = initialPermissions.map((permission) => permission.pk);

  const initialSetPermissionState: FormState = {
    status: "idle",
    message: ""
  }

  const [setPermissionState, setPermissionAction] = useFormState(
    setPermissions,
    initialSetPermissionState
  )

  return (
    <Flex
      bg={useColorModeValue('white', 'gray.800')}
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={"md"}
      w={'full'}
      p={5}
    >
      <SuccessAlert
        title="Success"
        description={setPermissionState.message}
        isOpen={setPermissionState.status === 'success'}
        onClose={() => router.push("/modules/uam/groups")}
      />

      <Formik
        initialValues={{
          permissions: initialPermissionPK
        }}
        validationSchema={setPermissionSchema}
        onSubmit={(values) => {
          const formData = new FormData();

          formData.append("group_id", pk as string);
          values.permissions.forEach((permission) => {
            formData.append("permissions[]", permission.toString());
          });

          setPermissionAction(formData);
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <Flex as="form"
            action={() => handleSubmit()}
            w={"full"}
            direction={"column"}
            gap={5}
          >
            <ModuleUAMPermissionHeader />
            <Accordion allowMultiple defaultIndex={[0]}>
              {Object.entries(groupedPermissions).map(([app, modules]) => (
                <AccordionItem key={app} py={4}>
                  <AccordionButton>
                    <Flex flex="1" textAlign="left" gap={4}>
                      <Text fontWeight="bold">Module</Text>
                      <Tag>{app}</Tag>
                    </Flex>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel>
                    <Flex direction={'column'} gap={5}>
                      {Object.entries(modules).map(([, submodules]) => (
                        Object.entries(submodules).map(([submodule, actions]) => (
                          <Stack spacing={3} key={submodule} pl={{ md: 4 }}>
                            <SubmoduleTitle title={submodule} />
                            <Flex gap={5} wrap="wrap">
                              {actions.map(({ pk, action }) => (
                                <ModuleUAMGroupSetPermissionCheckbox
                                  key={pk}
                                  isChecked={values.permissions.includes(pk)}
                                  onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    if (isChecked) {
                                      setFieldValue("permissions", [...values.permissions, pk]);
                                    }
                                    else {
                                      setFieldValue(
                                        "permissions",
                                        values.permissions.filter((p) => p !== pk)
                                      );
                                    }
                                  }}
                                >
                                  {action}
                                </ModuleUAMGroupSetPermissionCheckbox>
                              ))}
                            </Flex>
                          </Stack>
                        ))
                      ))}
                    </Flex>
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>

            <SetPermissionSubmit />
          </Flex>
        )}
      </Formik>
    </Flex>
  )
}
