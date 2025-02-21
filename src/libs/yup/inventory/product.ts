import * as Yup from 'yup';
import { productTypes, units } from '@/constants/modules/inventory/products';

export type Products = Yup.InferType<typeof productSchema>

export const productSchema = Yup.object().shape({
  image: Yup
    .string()
    .nullable()
    .optional(),
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
    .max(60, 'Name cannot exceed 60 characters including spaces')
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  
  product_type: Yup
    .string()
    .oneOf(productTypes, 'Invalid product type')
    .required('Product type is required'),
  
  tags: Yup
    .array()
    .of(
      Yup
        .string()
        .test('is-allowed', '', function (value) {
          const allowedNumberOnly = /^\d+$/;
          const isNumber = allowedNumberOnly.test(value as string);

          if (!isNumber) {
            return this.createError({
              message: 'Tags must be numbers'
            });
          }

          return true;
        })
  ),
  currency: Yup
    .number()
    .required("Currency is required!"),
  
  price: Yup
    .number()
    .optional()
    .nullable(),
  
  income_account_id: Yup
    .number()
    .typeError("Income Account is required")
    .nullable(),
    
  expense_account_id: Yup
    .number()
    .nullable(),
  
  product_category_id: Yup
    .number()
    .typeError("Product Category is required")
    .required("Product Category is required"),
  
  unit: Yup
    .string()
    .oneOf(units, 'Invalid unit')
    .required('Unit is required'),
});

export const productStockSchema = Yup.object().shape({
  stock: Yup
    .number()
    .required('Stock is required')
    .min(0, 'Stock must be at least 0')
    .typeError('Stock must be a number')
});