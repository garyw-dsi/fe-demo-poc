"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/sales"
import { salesClient } from "@/libs/api/services/sales";
import { revalidatePath } from "next/cache";

type QuotationItems = components['schemas']['QuotationCreate']['items'];
type PaymentTerms = components['schemas']['TransactionPaymentTerm'];
type DeliveryTerms = components['schemas']['TransactionDeliveryTerm'];

export const editSalesQuotation = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const currency = formData.get("currency") as string;
    const items = JSON.parse(formData.get("items") as string) as QuotationItems;

    const pk = formData.get("pk") as string;

    const parseItems = items.map((item) => {
      return {
        ...item,
        product_id: Number(item.product_id),
        discount_rate: Number(item.discount_rate) / 100 || null,
        discount_amount: Number(item.discount_amount) || null,
      }
    })

    const dpRate = formData.get("payment_dp_rate") as string;
    const paymentDpRate = Number(dpRate) / 100;

    const body: components['schemas']['QuotationUpdate'] = {
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

    console.log(JSON.stringify(body))
    
    const { response, error } = await salesClient.PUT("/quotation/{quotation_id}/", {
      params: {
        path: {
          quotation_id: Number(pk)
        }
      },
      body: body
    });

    console.log(error)

    if (response.ok) {
      revalidatePath("/modules/sales/quotations")
      revalidatePath(`/modules/sales/quotations/detail/${pk}`)

      return {
        status: "success",
        message: "success updated quotations"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("failed to updated quotations");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "failed to updated quotations"

    return {
      status: "error",
      message
    }
  }
}