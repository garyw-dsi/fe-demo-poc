"use server"

import { accountingClient } from "@/libs/api/services/accounting";
import { revalidatePath } from "next/cache";

export const deleteAccount = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await accountingClient.DELETE("/account/{account_id}/", {
      params: {
        path: {
          account_id: Number(pk)
        }
      }
    });

    if (response.ok) {
      revalidatePath("/modules/accounting/accounts");
      
      return {
        status: "success",
        message: "Account deleted successfully"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Failed to delete account");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to delete account";
    
    return {
      status: "error",
      message: message
    } 
  }
}