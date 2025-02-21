"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/accounting"
import { accountingClient } from "@/libs/api/services/accounting";
import { revalidatePath } from "next/cache";

export const createAccount = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const parentId = formData.get("parent_id") as string;
    const accountType = formData.get("account_type") || null;

    const body: components['schemas']['AccountCreate'] = {
      name: formData.get("name") as string,
      account_type: accountType
        ? accountType as components['schemas']['AccountType']
        : null,
      number: formData.get("number") as string,
      parent_id: parentId ? Number(parentId) : null,
      currency_id: Number(formData.get("currency") as string)
    }

    const { response } = await accountingClient.POST("/account/", {
      body
    });

    if (response.ok) {
      revalidatePath("/modules/accounting/accounts");
      
      return {
        status: "success",
        message: "Account created successfully"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    if (response.status === 400) { 
      throw new Error("Account Number already exists");
    }

    throw new Error("Failed to create account");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to create account";
    
    return {
      status: "error",
      message: message
    }
  }
}