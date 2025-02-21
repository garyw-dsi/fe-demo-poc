import * as Yup from "yup"

export type ProductCategory = Yup.InferType<typeof productCategorySchema>

export const productCategorySchema = Yup.object().shape({
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
    .max(100, 'Name cannot exceed 100 characters including spaces')
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  
  income_account_id: Yup
    .number()
    .typeError("Income Account is required")
    .required("Income Account is required"),
  
  expense_account_id: Yup
    .number()
    .typeError("Expense Account is required")
    .required("Expense Account is required")
})