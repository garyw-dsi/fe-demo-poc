"use server"

import { FormState } from "@/libs/api/constants";
import { salesClient } from "@/libs/api/services/sales";
import { components } from "@/libs/api/schema/sales";
import { revalidatePath } from "next/cache";

export const updateInvoice = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const items = formData.get("items") as string;
    const parsedItems = JSON.parse(items) as components["schemas"]["InvoiceCreate"]["items"];

    const invoiceId = Number(formData.get("invoice_id"));

    const body: components["schemas"]["InvoiceUpdate"] = {
      notes: formData.get("notes") as string,
      order_id: Number(formData.get("order_id")),
      discount_rate: Number(formData.get("discount_rate")) / 100 || null,
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

    const { response, error } = await salesClient.PUT("/invoice/{invoice_id}/", {
      params: {
        path: {
          invoice_id: invoiceId
        }
      },
      body: body
    })

    console.log(JSON.stringify(body))
    console.log(error)

    if (response.ok) {
      revalidatePath("/modules/sales/invoices");
      revalidatePath(`/modules/sales/invoices/${invoiceId}`);
      
      return {
        status: "success",
        message: "Invoice successfully updated"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Error while updating invoice");

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Error while updating invoice";
    
    return {
      status: "error",
      message
    }
  }
}