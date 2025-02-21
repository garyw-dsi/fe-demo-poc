"use server"

import { salesClient } from "@/libs/api/services/sales";
import { revalidatePath } from "next/cache";

export const deleteInvoice = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await salesClient.DELETE("/invoice/{invoice_id}/", {
      params: {
        path: {
          invoice_id: pk
        }
      }
    })

    if (response.ok) {
      revalidatePath("/modules/sales/invoices");
      return {
        status: "success",
        message: "Invoice has been deleted"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal Server Error");
    }

    throw new Error("Failed to delete invoice");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to delete invoice";
    
    return {
      status: "error",
      message
    }
  }
}