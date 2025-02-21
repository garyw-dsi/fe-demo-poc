"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/sales"

type QuotationItems = components['schemas']['QuotationCreate']['items'];
type QuotationStatus = components['schemas']['QuotationCreate']['status'];
type PaymentTerms = components['schemas']['TransactionPaymentTerm'];
type DeliveryTerms = components['schemas']['TransactionDeliveryTerm'];

export const createOrder = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const currency = formData.get("currency") as string;
    const items = JSON.parse(formData.get("items") as string) as QuotationItems;

    const parseItems = items.map((item) => {
      return {
        ...item,
        product_id: Number(item.product_id)
      }
    })

    const quotationId = formData.get("quotation_id");

    const body: components['schemas']['OrderCreate'] = {
      quotation_id: quotationId ? Number(quotationId) : null,
      currency_id: Number(currency),
      status: formData.get("status") as QuotationStatus,

      payment_terms: formData.get("payment_terms") as PaymentTerms,
      payment_n: Number(formData.get("payment_n")) || null,
      payment_dp_rate: Number(formData.get("payment_dp_rate")) || null,
      payment_dp: Number(formData.get("payment_dp")) || null,
      
      delivery_terms: formData.get("delivery_terms") as DeliveryTerms || null,
      discount_rate: Number(formData.get("discount_rate")) || null,
      items: parseItems,
      customer_id: Number(formData.get("customer")),
      lead_id: Number(formData.get("lead")) || null
    }

    console.log(body);

    return {
      status: "success",
      message: "Success created Purchase Order"
    }
  } catch (error) {
    const message = error instanceof Error 
      ? error.message
      : "Failed to created order";

    return {
      status: "error",
      message
    }
  }
}