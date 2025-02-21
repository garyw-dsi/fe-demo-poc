import { leadSource } from '@/constants/modules/crm';
import * as Yup from 'yup';

export type CreateLead = Yup.InferType<typeof createLeadSchema>

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const createLeadSchema = Yup.object().shape({
  name: Yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name cannot exceed 100 characters including spaces')
    .required('Name is required'),
  lead_source: Yup
    .string()
    .oneOf(
      leadSource.map((source) => source),
      'Invalid Lead Source'
    )
    .required('Lead Source is required'),
  lead_score: Yup
    .number()
    .typeError('Lead Score must be a number')
    .min(0, 'Lead Score must be at least 0')
    .max(100, 'Lead Score cannot exceed 100')
    .required('Lead Score is required'),
  contact_name: Yup
    .string()
    .min(3, 'Contact Name must be at least 3 characters')
    .max(100, 'Contact Name cannot exceed 100 characters including spaces')
    .optional()
    .nullable(),
  email: Yup
    .string()
    .email('Invalid email address')
    .optional()
    .nullable(),
  address: Yup
    .string()
    .max(255, 'Address cannot exceed 255 characters including spaces')
    .optional()
    .nullable(),
  phone: Yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(7, 'Phone number must be at least 7 characters')
    .max(64, 'Phone number cannot exceed 64 characters including spaces')
    .optional()
    .nullable(),
  phone_code: Yup
    .string()
    .min(1, 'Dial code is required')
    .max(4, 'Dial code cannot exceed 4 characters including spaces')
    .optional()
    .nullable(),
  customer_id: Yup
    .number()
    .optional()
    .nullable(),
  customer_name: Yup
    .string()
    .min(3, 'Customer Name must be at least 3 characters')
    .max(100, 'Customer Name cannot exceed 100 characters including spaces')
    .optional()
    .nullable(),
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
});