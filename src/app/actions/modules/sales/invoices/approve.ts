"use server"

import { salesClient } from "@/libs/api/services/sales"
import { revalidatePath } from "next/cache";

export const salesInvoiceApprove = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await salesClient.POST("/invoice/{invoice_id}/approve/", {
      params: {
        path: {
          invoice_id: pk
        }
      }
    });

    if (response.ok) {
      revalidatePath("/modules/sales/invoices");
      revalidatePath(`/modules/sales/invoices/detail/${pk}`);
      
      return {
        status: "success",
        message: "Invoice has been approved"
      }
    }

    if(response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to approve Invoice");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to approve Invoice";
    
    return {
      status: "error",
      message
    }
  }
}