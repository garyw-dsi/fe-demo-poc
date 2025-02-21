import * as Yup from "yup";

export type CreateBank = Yup.InferType<typeof createBankSchema>

export const createBankSchema = Yup.object().shape({
  name: Yup
    .string()
    .min(3, "Bank Name must be at least 3 characters")
    .max(50, "Bank Name must be at most 50 characters")
    .required("Bank Name is required"),
  number: Yup
    .string()
    .min(3, "Bank Number must be at least 3 characters")
    .max(50, "Bank Number must be at most 50 characters")
    .required("Bank Number is required"),
  identifier_code: Yup
    .string()
    .min(3, "Bank Identifier Code must be at least 3 characters")
    .max(50, "Bank Identifier Code must be at most 50 characters")
    .optional()
    .nullable(),
})