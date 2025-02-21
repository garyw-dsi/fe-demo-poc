import * as Yup from "yup"

export type Department = Yup.InferType<typeof departmentSchema>;

export const departmentSchema = Yup.object().shape({
  name: Yup
    .string()
    .min(2, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  
  parent_id: Yup
    .number()
    .nullable()
})