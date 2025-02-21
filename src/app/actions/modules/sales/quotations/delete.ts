"use server"

import { salesClient } from "@/libs/api/services/sales";
import { revalidatePath } from "next/cache";

export const deleteQuotation = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await salesClient.DELETE("/quotation/{quotation_id}/", {
      params: {
        path: {
          quotation_id: pk
        }
      }
    });

    if (response.ok) {
      revalidatePath("/modules/sales/quotations")
      revalidatePath(`/modules/sales/quotations/detail/${pk}`)
      
      return {
        status: "success",
        message: "Quotation has been deleted"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }
    throw new Error("Failed to delete quotation");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to delete order";
    
    return {
      status: "error",
      message
    }
  }
}