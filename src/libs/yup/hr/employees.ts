import * as Yup from "yup"

export type CreateEmployee = Yup.InferType<typeof createEmployeeSchema>;

export const createEmployeeSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Alphabetic characters only")
    .required("First Name is required"),
  last_name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Alphabetic characters only")
    .required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  group_id: Yup.number()
    .typeError("Department is required")
    .positive("Department is required")
    .min(1, "Department is required")
    .integer("Department is required")
    .required("Department is required"),
  image: Yup
    .string()
    .nullable()
    .optional(),
  salary_structure_id: Yup
    .number()
    .required("Salary structure is required")
    .typeError("Salary structure is required"),
  banks: Yup
    .array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("Bank name is required"),
        number: Yup.string().required("Bank number is required"),
      })
    )
});