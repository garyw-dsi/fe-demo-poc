"use client"

import { Alert, AlertIcon, Flex, Stack, useToast } from "@chakra-ui/react";
import { Formik } from "formik";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";

import { FormState } from "@/libs/api/constants";
import SuccessAlert from "@/components/alert/success";
import { createHRPayroll } from "@/app/actions/modules/hr/payrolls/create";
import { type CreatePayroll, createPayrollSchema } from "@/libs/yup/hr/payrolls";
import ModuleHRPayrollCreateInformation from "./information";
import ModuleHRPayrollEmployeeCreate from "./employee";
import ModuleHRPayrollSubmit from "../button";


const initialValues: CreatePayroll = {
  batch_name: "",
  period_start: "",
  period_end: "",
  employees: [
    {
      employee_id: "",
    }
  ]
};

const isDate = (date: string): boolean => {
  return !isNaN(Date.parse(date));
}

export default function ModuleHRPayrollCreateForm() {
  const router = useRouter();

  const toast = useToast();

  const initialState: FormState = {
    status: "idle",
    message: ""
  }

  const [createPayrollState, createPayrollAction] = useFormState(
    createHRPayroll,
    initialState
  )

  const onClose = () => router.push("/modules/hr/payrolls");

  return (
    <Flex w={"full"}>
      <SuccessAlert
        isOpen={createPayrollState.status === "success"}
        onClose={onClose}
        title="Payroll Creation Queued"
        description="Success creating queue for payroll"
      />

      <Formik
        initialValues={initialValues}
        validationSchema={createPayrollSchema}
        onSubmit={(values) => {
          const formData = new FormData()

          if (!isDate(values.period_start) ||!isDate(values.period_end)) {
            toast({
              title: "Date Error",
              description: "Invalid date format!",
              status: "warning"
              });

            return;
          }

          formData.append("batch_name", values.batch_name)
          formData.append("period_start", values.period_start)
          formData.append("period_end", values.period_end)

          const employees = JSON.stringify(values.employees);
          formData.append("employees", employees)

          createPayrollAction(formData)
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            {createPayrollState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createPayrollState.message}
              </Alert>
            )}
            <ModuleHRPayrollCreateInformation/>
            <ModuleHRPayrollEmployeeCreate/>
            <Flex justify={'end'}>
              <ModuleHRPayrollSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}