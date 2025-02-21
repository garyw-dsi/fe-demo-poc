"use server"

import { salesClient } from "@/libs/api/services/sales"
import { revalidatePath } from "next/cache";

export const salesQuotationApprove = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await salesClient.POST("/quotation/{quotation_id}/approve/", {
      params: {
        path: {
          quotation_id: pk
        }
      }
    });

    if (response.ok) {
      revalidatePath("/modules/sales/quotations");
      revalidatePath(`/modules/sales/quotations/detail/${pk}`);
      
      return {
        status: "success",
        message: "Quotation has been approved"
      }
    }

    if(response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to approve quotation");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to approve quotation";
    
    return {
      status: "error",
      message
    }
  }
}