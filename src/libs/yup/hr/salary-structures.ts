import * as Yup from "yup"

export type CreateSalaryStructure = Yup.InferType<typeof createSalaryStructureSchema>

export const createSalaryStructureSchema = Yup.object().shape({
  name: Yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name must be at most 100 characters")
    .required("Name is required"),
  description: Yup
    .string()
    .optional()
    .nullable(),
  department_id: Yup
    .number()
    .required("Department is required")
    .typeError("Department is required"),
  employment_type: Yup  
    .string()
    .oneOf(["Full Time", "Part Time", "Internship"], "Employment type is required")
    .required("Employment type is required"),
  currency: Yup
    .number()
    .required("Currency is required")
    .typeError("Currency is required"),
  basic_salary: Yup
    .number()
    .required("Basic salary is required")
    .typeError("Basic salary is required"),
  housing_allowance: Yup  
    .number()
    .required("Housing allowance is required")
    .typeError("Housing allowance is required"),
  transport_allowance: Yup
    .number()
    .required("Transport allowance is required")
    .typeError("Transport allowance is required"),
  meal_allowance: Yup
    .number()
    .required("Meal allowance is required")
    .typeError("Meal allowance is required"),
  other_allowance: Yup
    .number()
    .optional()
    .nullable(),
  tax_deduction: Yup
    .number()
    .required("Tax deduction is required")
    .typeError("Tax deduction is required"),
  pension_deduction: Yup
    .number()
    .required("Pension deduction is required")
    .typeError("Pension deduction is required"),
  other_deduction: Yup
    .number()
    .optional()
    .nullable(),
  overtime_rate: Yup
    .number()
    .required("Overtime rate is required")
    .typeError("Overtime rate is required"),
  salary_frequency: Yup
    .string()
    .oneOf(["Monthly", "Weekly", "Daily"], "Salary frequency is required")
    .required("Salary frequency is required"),
  tax_calculation: Yup
    .string()
    .oneOf(["Gross", "Net"], "Tax calculation is required")
    .required("Tax calculation is required"),
})