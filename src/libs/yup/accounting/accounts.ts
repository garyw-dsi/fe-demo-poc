import { accountTypes } from "@/constants/modules/accounting/accounts";
import * as Yup from "yup";


export type CreateAccount = Yup.InferType<typeof createAccountSchema>

export const createAccountSchema = Yup.object().shape({
  name: Yup
    .string()
    .test('has-no-illegal-character', '', function (value) {
      const illegalCharacter = /[^a-zA-Z0-9\s]/.test(value as string);

      if (illegalCharacter) {
        return this.createError({
          message: 'Special characters are not allowed!',
        });
      }

      return true;
    })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .required("Name is required"),
  number: Yup.string()
    .matches(/^\d+$/, "Number must be a valid number")
    .length(2, "Number must be exactly 2 digits") 
    .required("Number is required"),
  account_type: Yup
    .string()
    .oneOf(accountTypes, "Invalid Account Type")
    .nullable()
    .when('parent_id', { 
      is: (value: number) => !value,
      then: (schema) => schema.required("Account type is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  parent_id: Yup
    .number()
    .nullable()
    .optional(),
  currency: Yup
    .number()
    .required("Currency is required!")
});

export type UpdateBalanceAccount = Yup.InferType<typeof updateBalanceAccountSchema>

export const updateBalanceAccountSchema = Yup.object().shape({
  amount: Yup.number()
    .min(0, "Amount must be greater than 0")
    .typeError("Amount is required")
    .required("Amount is required")
});