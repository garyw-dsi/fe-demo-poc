import { deliveryTerms, PaymentTerm, paymentTerms, salesStatus } from "@/constants/modules/sales";
import * as Yup from "yup";

export const paymentN: PaymentTerm[] = ["Due in N days", "Due N days after end of month"];

export type CreateQuotation = Yup.InferType<typeof createQuotationSchema>

export const createQuotationSchema = Yup.object().shape({
  status: Yup
    .string()
    .oneOf(salesStatus, "Invalid status")
    .default("Draft")
    .required("Status is required"),

  payment_terms: Yup
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
    .nullable(),

  payment_dp: Yup
    .number()
    .nullable(),

  delivery_terms: Yup
    .string()
    .oneOf(deliveryTerms, "Invalid delivery term")
    .required("Delivery term is required"),

  discount_rate: Yup
    .number()
    .nullable(),

  currency: Yup
    .number()
    .typeError("Currency is required")
    .required("Currency is required"),

  customer_id: Yup
    .number()
    .typeError("Vendor is required")
    .required("Vendor is required"),

  lead: Yup
    .number()
    .nullable()
    .notRequired(),
  
  items: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
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
            .nullable(),
          vat_rate: Yup
            .number()
            .nullable(),
          vat: Yup
            .number()
            .nullable()
            .required("VAT is required"),
        })
        
    )
    .required("Items are required")
});
