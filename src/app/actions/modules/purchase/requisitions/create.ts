"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/sales"

type RequisitionItems = components['schemas']['QuotationCreate']['items'];
type RequisitionStatus = components['schemas']['QuotationCreate']['status'];
type PaymentTerms = components['schemas']['TransactionPaymentTerm'];
type DeliveryTerms = components['schemas']['TransactionDeliveryTerm'];

export const createPurchaseRequisition = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const currency = formData.get("currency") as string;
    const items = JSON.parse(formData.get("items") as string) as RequisitionItems;

    const parseItems = items.map((item) => {
      return {
        ...item,
        product_id: Number(item.product_id)
      }
    })

    const body: components['schemas']['QuotationCreate'] = {
      currency_id: Number(currency),
      status: formData.get("status") as RequisitionStatus,

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
    
    console.log(body)

    return {
      status: "success",
      message:"success created Requisition"
    }
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "failed to created Requisition"

    return {
      status: "error",
      message
    }
  }
}