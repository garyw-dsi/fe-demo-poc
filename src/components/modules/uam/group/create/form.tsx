"use client"

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex, FormControl } from "@chakra-ui/react";
import { createGroup } from "@/app/actions/modules/uam/groups";
import { Field, Formik } from "formik";

import { createGroupSchema } from "@/libs/yup/uam";
import { FormState } from "@/libs/api/constants";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";

import UAMGroupSelect from "@/components/modules/uam/group/select";
import SuccessAlert from "@/components/alert/success";
import ModuleUAMGroupSubmit from "@/components/modules/uam/group/button";
import ModuleUAMGroupFormLayout from "../layout";

export default function ModuleUAMGroupCreateForm({
  initialGroups
}: {
  initialGroups: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const router = useRouter();

  const initialCreateGroupState: FormState = {
    status: "idle",
    message: "",
  };

  const [createGroupState, setCreateGroup] = useFormState(
    createGroup,
    initialCreateGroupState
  );

  const onClose = () => {
    router.push("/modules/uam/groups");
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          name: "",
          parent_id: 0
        }}
        validationSchema={createGroupSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("parent_id", values.parent_id.toString());

          setCreateGroup(formData);
        }}
      >
        {({ handleSubmit, errors, touched }) => (
          <Flex as="form"
            action={() => handleSubmit()}
            direction={'column'}
            w={{ base: 'full', md: 'lg', lg: 'xl' }}
            gap={5}
          >
            <SuccessAlert
              isOpen={createGroupState.status === "success"}
              title="Group Created"
              description="Group has been created successfully."
              onClose={onClose}
            />

            {createGroupState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createGroupState.message}
              </Alert>
            )}

            <ModuleUAMGroupFormLayout title="Group Information">
              <Flex direction={'column'} gap={5}>
                <FormControl
                  isRequired
                  isInvalid={!!errors.name && touched.name}
                >
                  <ModuleInputLabel label="Group Name" />
                  <Field
                    as={ModuleInput}
                    name="name"
                    placeholder="Group Name"
                  />
                  <ModuleInputErrorMessage value={errors.name} />
                </FormControl>

                <FormControl
                  isRequired
                  isInvalid={!!errors.parent_id && touched.parent_id}
                >
                  <ModuleInputLabel label="Parent Group" />
                  <UAMGroupSelect initialOptions={initialGroups} fieldName="parent_id" />
                  <ModuleInputErrorMessage value={errors.parent_id} />
                </FormControl>
              </Flex>
            </ModuleUAMGroupFormLayout>

            <Flex justify={'end'}>
              <ModuleUAMGroupSubmit />
            </Flex>
          </Flex>
        )}
      </Formik>
    </Flex>
  )
}