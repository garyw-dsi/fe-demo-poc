import { deliveryTerms, PaymentTerm, paymentTerms } from "@/constants/modules/sales";
import * as Yup from "yup";

export const paymentN: PaymentTerm[] = ["Due in N days", "Due N days after end of month"];

export type CreateOrder = Yup.InferType<typeof createOrderSchema>

export const createOrderSchema = Yup.object().shape({
  payment_term: Yup
    .string()
    .oneOf(paymentTerms, "Invalid payment term")
    .required("Payment term is required"),

  payment_n: Yup
    .number()
    .nullable()
    .when("payment_terms", {
      is: (value: PaymentTerm) => paymentN.includes(value),
      then: (schema) => schema.required("Payment days is required"),
      otherwise: (schema) => schema.notRequired(),
    }),

  payment_dp_rate: Yup
    .number()
    .min(0, "Invalid percentage, must be between 0 and 100")
    .max(100, "Invalid percentage, must be between 0 and 100")
    .typeError("Invalid Percentage, must a number")
    .nullable(),
  
  discount_rate: Yup
    .number()
    .min(0, "Invalid percentage, must be between 0 and 100")
    .max(100, "Invalid percentage, must be between 0 and 100")
    .typeError("Invalid Percentage, must a number")
    .nullable(),
  
    payment_dp: Yup
      .number()
      .min(0, "Invalid payment DP, must be greater than 0")
      .typeError("Invalid Percentage, must a number")
      .nullable(),

  delivery_term: Yup
    .string()
    .oneOf(deliveryTerms, "Invalid delivery term")
    .required("Delivery term is required"),

  notes: Yup
    .string()
    .nullable(),

  currency: Yup
    .number()
    .typeError("Currency is required")
    .required("Currency is required"),
  
  customer_id: Yup
    .number()
    .typeError("Customer is required")
    .required("Customer is required"),
  
  items: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          unit: Yup
            .string()
            .required("Unit is required"),
          quantity: Yup
            .number()
            .required("Quantity is required"),
          price: Yup
            .number()
            .required("Price is required"),
          product_id: Yup
            .number()
            .typeError("Product is required")
            .required("Product is required"),
          discount_rate: Yup
            .number()
            .min(0, "Invalid percentage, must be between 0 and 100")
            .max(100, "Invalid percentage, must be between 0 and 100")
            .typeError("Invalid Percentage, must a number")
            .nullable(),
          discount_amount: Yup
            .number()
            .min(0, "Invalid amount, must be greater than 0")
            .typeError("Invalid value, must a number")
            .nullable(),
          vat_rate: Yup
            .number()
            .nullable(),
          vat_id: Yup
            .number()
            .nullable()
            .required("VAT is required"),
        })
        
    )
    .required("Items are required")
});
