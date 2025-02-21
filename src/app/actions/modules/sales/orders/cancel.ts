"use server"

import { salesClient } from "@/libs/api/services/sales"
import { revalidatePath } from "next/cache";

export const salesOrderCancel = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await salesClient.POST("/order/{order_id}/cancel/", {
      params: {
        path: {
          order_id: pk
        }
      }
    });

    if (response.ok) {
      revalidatePath("/modules/sales/orders");
      revalidatePath(`/modules/sales/orders/detail/${pk}`);
      
      return {
        status: "success",
        message: "Order has been cancelled"
      }
    }

    if(response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to cancel Order");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to cancel Order";
    
    return {
      status: "error",
      message
    }
  }
}