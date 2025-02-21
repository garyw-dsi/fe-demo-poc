import * as Yup from "yup";
import { addressTypes, customerLegalTypes, industryType } from "@/constants/modules/crm";

export type CreateContact = Yup.InferType<typeof createContactSchema>
export type EditContact = Yup.InferType<typeof editContactSchema>

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

export const createContactSchema = Yup.object().shape({
  is_customer: Yup
    .boolean()
    .required('Customer Type is required'),
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
    .max(80, 'Name cannot exceed 80 characters including spaces')
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  legal_type: Yup
    .string()
    .oneOf(
      customerLegalTypes.map((legalType) => legalType.values),
      'Invalid Legal Type'
    )
    .required("Legal Type is required!"),
  tax_id: Yup
    .string()
    .test('only-number', '', function (value) {
      const onlyNumber = /^\d+$/.test(value as string);

      if (!onlyNumber) {
        return this.createError({
          message: 'Only numbers are allowed!',
        });
      }

      return true;
    })
    .required('Tax ID is required'),
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
  industry_type: Yup
    .array()
    .of(
      Yup
        .string()
        .oneOf(
          industryType.map((industry) => industry.values),
          'Invalid Industry Type'
        )
    ),
  address: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          address_type: Yup
            .string()
            .oneOf(
              addressTypes.map((address) => address.values),
              'Invalid Address Type'
            )
            .required('Address Type is required'),
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
            .max(80, 'Name cannot exceed 80 characters including spaces')
            .min(3, 'Name must be at least 3 characters')
            .required('Name is required'),
          email: Yup
            .string()
            .email('Invalid email address')
            .max(255, 'Email cannot exceed 255 characters including spaces')
            .required('Email is required'),
          address: Yup
            .string()
            .max(255, 'Address cannot exceed 255 characters including spaces')
            .required('Address is required'),
          phone: Yup
            .string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(7, 'Phone number must be at least 7 characters')
            .max(64, 'Phone number cannot exceed 64 characters including spaces')
            .required('Phone is required'),
          phone_code: Yup
            .string()
            .min(1, 'Dial code is required')
            .max(4, 'Dial code cannot exceed 4 characters including spaces')
            .required('Dial code is required')
        })
    ),
  image: Yup
    .string()
    .nullable()
    .optional(),
});

export const editContactSchema = Yup.object().shape({
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
    .max(80, 'Name cannot exceed 80 characters including spaces')
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  legal_type: Yup
    .string()
    .oneOf(
      customerLegalTypes.map((legalType) => legalType.values),
      'Invalid Legal Type'
    )
    .required("Legal Type is required!"),
  tax_id: Yup
    .string()
    .test('only-number', '', function (value) {
      const onlyNumber = /^\d+$/.test(value as string);

      if (!onlyNumber) {
        return this.createError({
          message: 'Only numbers are allowed!',
        });
      }

      return true;
    })
    .required('Tax ID is required'),
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
  industry: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          type: Yup
            .string()
            .oneOf(
              industryType.map((industry) => industry.values),
              'Invalid Industry Type'
            ),
          pk: Yup
            .string()
            .optional()
            .nullable()
        })
    ),
  address: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          pk: Yup
            .number()
            .optional()
            .nullable(),
          address_type: Yup
            .string()
            .oneOf(
              addressTypes.map((address) => address.values),
              'Invalid Address Type'
            )
            .required('Address Type is required'),
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
            .max(80, 'Name cannot exceed 80 characters including spaces')
            .min(3, 'Name must be at least 3 characters')
            .required('Name is required'),
          email: Yup
            .string()
            .email('Invalid email address')
            .max(255, 'Email cannot exceed 255 characters including spaces')
            .required('Email is required'),
          address: Yup
            .string()
            .max(255, 'Address cannot exceed 255 characters including spaces')
            .required('Address is required'),
          phone: Yup
            .string()
            .matches(phoneRegExp, 'Phone number is not valid')
            .min(7, 'Phone number must be at least 7 characters')
            .max(64, 'Phone number cannot exceed 64 characters including spaces')
            .required('Phone is required'),
          phone_code: Yup
            .string()
            .min(1, 'Dial code is required')
            .max(4, 'Dial code cannot exceed 4 characters including spaces')
            .required('Dial code is required')
        })
    ),
  image: Yup
    .string()
    .nullable()
    .optional(),
});