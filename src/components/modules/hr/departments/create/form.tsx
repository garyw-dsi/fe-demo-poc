"use client"

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex, FormControl } from "@chakra-ui/react";
import { Field, Formik } from "formik";

import { FormState } from "@/libs/api/constants";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel } from "@/components/modules/input";

import UAMGroupSelect from "@/components/modules/uam/group/select";
import SuccessAlert from "@/components/alert/success";
import ModuleUAMGroupSubmit from "@/components/modules/uam/group/button";
import { Department, departmentSchema } from "@/libs/yup/hr/departments";
import ModuleHRDepartmentFormLayout from "../layout";
import { createDepartment } from "@/app/actions/modules/hr/departments";

export default function ModuleHRDepartmentCreateForm({
  initialDepartment
}: {
  initialDepartment: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [createDepartmentState, createDepartmentAction] = useFormState(
    createDepartment,
    initialState
  );

  const onClose = () => {
    router.push("/modules/hr/departments");
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          name: "",
          parent_id: null
        } as Department}
        validationSchema={departmentSchema}
        onSubmit={(values) => {
          const formData = new FormData();

          formData.append("name", values.name);

          if (values.parent_id) {
            formData.append("parent_id", values.parent_id.toString())
          }

          createDepartmentAction(formData);
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
              isOpen={createDepartmentState.status === "success"}
              title="Department Created"
              description={createDepartmentState.message}
              onClose={onClose}
            />

            {createDepartmentState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createDepartmentState.message}
              </Alert>
            )}

            <ModuleHRDepartmentFormLayout title="Department Information">
              <Flex direction={'column'} gap={5}>
                <FormControl
                  isRequired
                  isInvalid={!!errors.name && touched.name}
                >
                  <ModuleInputLabel label="Department Name" />
                  <Field
                    as={ModuleInput}
                    name="name"
                    placeholder="Department Name"
                  />
                  <ModuleInputErrorMessage value={errors.name} />
                </FormControl>

                <FormControl
                  isInvalid={!!errors.parent_id && touched.parent_id}
                >
                  <ModuleInputLabel label="Parent Department" />
                  <UAMGroupSelect initialOptions={initialDepartment} fieldName="parent_id" />
                  <ModuleInputErrorMessage value={errors.parent_id} />
                </FormControl>
              </Flex>
            </ModuleHRDepartmentFormLayout>

            <Flex justify={'end'}>
              <ModuleUAMGroupSubmit />
            </Flex>
          </Flex>
        )}
      </Formik>
    </Flex>
  )
}