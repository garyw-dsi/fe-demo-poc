"use client"

import { Flex, Text, useColorModeValue, FormControl, Divider, Alert, AlertIcon } from "@chakra-ui/react";
import { Formik } from "formik";

import { components } from "@/libs/api/schema/uam";
import { organizationTransferMaintainSchema } from "@/libs/yup/uam";

import UAMUserSelectByEmail from "@/components/modules/uam/user/select";
import { ModuleInputErrorMessage, ModuleInputHelper, ModuleInputLabel } from "@/components/modules/input";
import TransferMaintainerOrgSubmit from "./button";
import { FormState } from "@/libs/api/constants";
import { useFormState } from "react-dom";
import { setOrganizationMaintainer } from "@/app/actions/modules/uam/organization";
import SuccessAlert from "@/components/alert/success";
import { useRouter } from "next/navigation";

const Header = () => {
  return (
    <Flex direction={"column"} gap={2}>
      <Text fontSize={"lg"} fontWeight={"bold"}>
        Maintainer Organization
      </Text>
      <Text fontSize={"xs"} color={useColorModeValue("gray.500", "gray.300")}>
        Maintainer is the person who has full access to the organization
      </Text>
    </Flex>
  )
}

export default function ModuleUAMTransferMaintainOrg({
  initialMaintain
}: {
  initialMaintain: components['schemas']['Organization']
}) {
  const router = useRouter();
  const { maintainer } = initialMaintain;

  const initialSelectValue = {
    label: `
      ${maintainer.email} | ${maintainer.first_name} ${maintainer.last_name}
    `,
    value: String(maintainer.pk)
  }

  const initialTransferMaintainState: FormState = {
    status: "idle",
    message: ""
  }

  const [transferMaintainState, transferMaintainAction] = useFormState(
    setOrganizationMaintainer,
    initialTransferMaintainState
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
        description={transferMaintainState.message}
        isOpen={transferMaintainState.status === 'success'}
        onClose={() => router.push("/modules/uam/organization")}
      />



      <Formik
        initialValues={{
          maintainer_id: initialMaintain.maintainer.pk
        }}
        validationSchema={organizationTransferMaintainSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("maintainer_id", String(values.maintainer_id));
          formData.append("organization_id", String(initialMaintain.pk));

          transferMaintainAction(formData);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Flex as="form"
            action={() => handleSubmit()}
            w={"full"}
            direction={"column"}
            gap={5}
          >
            {transferMaintainState.status === 'error' && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {transferMaintainState.message}
              </Alert>
            )}

            <Header />
            <Divider />
            <FormControl
              isRequired
              isInvalid={!!errors.maintainer_id && touched.maintainer_id}
            >
              <ModuleInputLabel label="Transfer Maintainer To" />
              <UAMUserSelectByEmail
                fieldName="maintainer_id"
                placeholder="Search user by email"
                defaultValue={initialSelectValue}
              />
              <ModuleInputHelper
                helper="Search user by input user email"
              />
              <ModuleInputErrorMessage value={errors.maintainer_id} />
            </FormControl>

            <Flex mt={5}>
              <TransferMaintainerOrgSubmit />
            </Flex>
          </Flex>
        )}
      </Formik>
    </Flex>
  )
}
