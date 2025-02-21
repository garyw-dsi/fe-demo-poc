"use client"

import { useFormState } from "react-dom";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";
import SuccessAlert from "@/components/alert/success";
import ModuleHREmployeeSetImage from "../image";
import { createEmployee } from "@/app/actions/modules/hr/employees";
import { CreateEmployee, createEmployeeSchema } from "@/libs/yup/hr/employees";
import ModuleHREmployeeSubmit from "../button";
import ModuleHREmployeeInformationCreate from "./employee-information";
import ModuleHREmployeeBankCreate from "./bank-information";
import ModuleHREmployeeSalaryCreate from "./salary-information";

const initialValues: CreateEmployee = {
  first_name: "",
  last_name: "",
  email: "",
  group_id: NaN,
  banks: [],
  salary_structure_id: NaN,
}

type Option = {
  value: string;
  label: string;
}

export default function ModuleHREmployeeCreateForm({
  initialGroups, initialSalaryStructures
}: {
  initialGroups: Option[] | undefined;
  initialSalaryStructures: Option[] | undefined;
}) {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [createEmployeeState, createEmployeeAction] = useFormState(
    createEmployee,
    initialState
  );

  const onClose = () => {
    router.push("/modules/hr/employees");
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={initialValues}
        validationSchema={createEmployeeSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("first_name", values.first_name);
          formData.append("last_name", values.last_name);
          formData.append("email", values.email);
          formData.append("group_id", values.group_id.toString());
          formData.append("salary_structure_id", values.salary_structure_id.toString());

          if (values.banks && values.banks.length > 0) {
            const banks = JSON.stringify(values.banks);
            formData.append("banks", banks);
          }

          if (file) {
            formData.append("image", file)
          }

          createEmployeeAction(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={createEmployeeState?.status === "success"}
              title="Employee Created"
              description={createEmployeeState.message}
              onClose={onClose}
            />

            {createEmployeeState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createEmployeeState.message}
              </Alert>
            )}

            <Stack spacing={5} w={'full'}>
              <ModuleHREmployeeInformationCreate
                profilePicture={<ModuleHREmployeeSetImage setFile={setFile} />}
                initialGroups={initialGroups}
              />
              <ModuleHREmployeeSalaryCreate
                initialSalaryStructures={initialSalaryStructures}
              />
              <ModuleHREmployeeBankCreate />

              <Flex justify={'end'}>
                <ModuleHREmployeeSubmit />
              </Flex>
            </Stack>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}