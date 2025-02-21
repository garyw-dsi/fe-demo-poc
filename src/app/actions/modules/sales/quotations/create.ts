"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/sales"
import { salesClient } from "@/libs/api/services/sales";
import { revalidatePath } from "next/cache";

type QuotationItems = components['schemas']['QuotationCreate']['items'];
type PaymentTerms = components['schemas']['TransactionPaymentTerm'];
type DeliveryTerms = components['schemas']['TransactionDeliveryTerm'];

export const createSalesQuotation = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const currency = formData.get("currency") as string;
    const items = JSON.parse(formData.get("items") as string) as QuotationItems;

    const parseItems = items.map((item) => {
      return {
        ...item,
        product_id: Number(item.product_id),
        discount_rate: Number(item.discount_rate) / 100 || null,
        discount_amount: Number(item.discount_amount) || null
      }
    })

    const dpRate = formData.get("payment_dp_rate") as string;
    const paymentDpRate = Number(dpRate) / 100;

    const body: components['schemas']['QuotationCreate'] = {
      currency_id: Number(currency),

      payment_term: formData.get("payment_terms") as PaymentTerms,
      payment_n: Number(formData.get("payment_n")) || null,
      payment_dp_rate: paymentDpRate || null,
      payment_dp: formData.get("payment_dp") as string || null,
      notes: formData.get("notes") as string || null,
      discount_rate: Number(formData.get("discount_rate")) / 100 || null,
      
      delivery_term: formData.get("delivery_terms") as DeliveryTerms || null,
      items: parseItems,
      customer_id: Number(formData.get("customer")),
      lead_id: Number(formData.get("lead")) || null
    }

    const { response } = await salesClient.POST("/quotation/", {
      body: body
    });

    if (response.ok) {
      revalidatePath("/modules/sales/quotations")
      
      return {
        status: "success",
        message: "success created quotations"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("failed to created quotations");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "failed to created quotations"

    return {
      status: "error",
      message
    }
  }
}