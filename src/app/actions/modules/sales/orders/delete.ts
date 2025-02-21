"use server"

import { salesClient } from "@/libs/api/services/sales";
import { revalidatePath } from "next/cache";

export const deleteOrder = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await salesClient.DELETE("/order/{order_id}/", {
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
        message: "Order has been deleted"
      }
    }
    
    if (response.status === 500) {
      throw new Error("Internal server error");
    }
    
    throw new Error("Failed to delete order");
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