import * as Yup from "yup";

export type CreateInvoice = Yup.InferType<typeof createInvoiceSchema>

export const createInvoiceSchema = Yup.object().shape({
  notes: Yup
    .string()
    .nullable(),
  
  discount_rate: Yup
    .number()
    .min(0, "Invalid percentage, must be between 0 and 100")
    .max(100, "Invalid percentage, must be between 0 and 100")
    .typeError("Invalid Percentage, must a number")
    .nullable(),
  
  items: Yup
    .array()
    .of(
      Yup
        .object()
        .shape({
          order_item_id: Yup  
            .number(),
          quantity: Yup
            .number()
            .required("Quantity is required"),
          price: Yup
            .number()
            .required("Price is required"),
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
            .required("VAT Rate is required"),
          vat_id: Yup
            .number()
            .required("VAT ID is required")
        })
        
    )
    .required("Items are required")
});
