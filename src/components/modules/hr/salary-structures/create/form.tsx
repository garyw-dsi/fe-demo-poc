"use client"

import { CreateSalaryStructure, createSalaryStructureSchema } from "@/libs/yup/hr/salary-structures";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import ModuleHRSalaryStructureSubmit from "../button";
import ModuleHRSalaryStructureInformationCreate from "./structure-information";
import ModuleHRSalaryStructureSalaryCreate from "./salary-information";
import ModuleHRSalaryStructureAllowanceCreate from "./allowances-information";
import ModuleHRSalaryStructureDeductionCreate from "./deductions-information";
import { FormState } from "@/libs/api/constants";
import { useFormState } from "react-dom";
import { createSalaryStructure } from "@/app/actions/modules/hr/salary-structures";
import SuccessAlert from "@/components/alert/success";
import { useRouter } from "next/navigation";

const initialValues: CreateSalaryStructure = {
  name: "",
  description: "",
  department_id: NaN,
  employment_type: "Full Time",
  basic_salary: 0,
  housing_allowance: 0,
  transport_allowance: 0,
  meal_allowance: 0,
  other_allowance: 0,
  tax_deduction: 0,
  pension_deduction: 0,
  other_deduction: 0,
  overtime_rate: 0,
  salary_frequency: "Monthly",
  tax_calculation: "Gross",
  currency: NaN
}

interface Option {
  value: string;
  label: string;
}

export default function ModuleHRSalaryStructureCreateForm({
  initialDepartment, initialCurrency
}: {
  initialDepartment: Option[] | undefined;
  initialCurrency: Option[] | undefined;
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: ""
  }

  const [createSalaryStructureState, createSalaryStructureAction] = useFormState(
    createSalaryStructure,
    initialState
  );

  const onClose = () => {
    router.push("/modules/hr/salary-structures");
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={initialValues}
        validationSchema={createSalaryStructureSchema}
        onSubmit={(values) => {
          const formData = new FormData()

          formData.append('name', values.name)

          if (values.description) {
            formData.append('description', values.description)
          }

          formData.append('department_id', values.department_id.toString())
          formData.append('employment_type', values.employment_type)
          formData.append('basic_salary', values.basic_salary.toString())
          formData.append('overtime_rate', values.overtime_rate.toString())

          formData.append('salary_frequency', values.salary_frequency)
          formData.append('tax_calculation', values.tax_calculation)
          formData.append('currency', values.currency.toString())

          formData.append('housing_allowance', values.housing_allowance.toString())
          formData.append('transport_allowance', values.transport_allowance.toString())
          formData.append('meal_allowance', values.meal_allowance.toString())

          if (values.other_allowance) {
            formData.append('other_allowance', values.other_allowance.toString())
          }

          formData.append('tax_deduction', values.tax_deduction.toString())
          formData.append('pension_deduction', values.pension_deduction.toString())

          if (values.other_deduction) {
            formData.append('other_deduction', values.other_deduction.toString())
          }

          createSalaryStructureAction(formData)
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={createSalaryStructureState?.status === "success"}
              title="Structure Created"
              description={createSalaryStructureState.message}
              onClose={onClose}
            />

            {createSalaryStructureState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createSalaryStructureState.message}
              </Alert>
            )}

            <Stack spacing={5} w={'full'}>
              <ModuleHRSalaryStructureInformationCreate
                initialDepartment={initialDepartment}
              />
              <ModuleHRSalaryStructureSalaryCreate
                initialCurrency={initialCurrency}
              />
              <ModuleHRSalaryStructureAllowanceCreate />
              <ModuleHRSalaryStructureDeductionCreate />
              <Flex justify={'end'}>
                <ModuleHRSalaryStructureSubmit />
              </Flex>
            </Stack>
          </Stack>
        )}
      </Formik>
    </Flex >
  )
}