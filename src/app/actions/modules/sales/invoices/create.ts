"use server"

import { FormState } from "@/libs/api/constants";
import { salesClient } from "@/libs/api/services/sales";
import { components } from "@/libs/api/schema/sales";
import { revalidatePath } from "next/cache";

export const createInvoice = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const items = formData.get("items") as string;
    const parsedItems = JSON.parse(items) as components["schemas"]["InvoiceCreate"]["items"];

    const body: components["schemas"]["InvoiceCreate"] = {
      discount_rate: Number(formData.get("discount_rate")) / 100 || null,
      notes: formData.get("notes") as string,
      order_id: Number(formData.get("order_id")),
      items: parsedItems.map((item) => { 
        return {
          order_item_id: item.order_item_id,
          price: item.price,
          quantity: item.quantity,
          vat_rate: item.vat_rate,
          discount_rate: Number(item.discount_rate) / 100 || null,
          discount_amount: Number(item.discount_amount) || null
        }
      }),
    }

    const { response } = await salesClient.POST("/invoice/", {
      body: body
    })
    
    if (response.ok) {
      revalidatePath("/modules/sales/invoices");

      return {
        status: "success",
        message: "Invoice successfully created"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Error while creating invoice");

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Error while creating invoice";
    
    return {
      status: "error",
      message
    }
  }
}