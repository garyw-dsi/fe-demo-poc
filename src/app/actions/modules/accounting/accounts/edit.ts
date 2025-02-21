"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/accounting"
import { accountingClient } from "@/libs/api/services/accounting";
import { revalidatePath } from "next/cache";

export const updateAccount = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const parentId = formData.get("parent_id") as string;
    const accountId = formData.get("account_id") as string;

    const body: components['schemas']['AccountCreate'] = {
      name: formData.get("name") as string,
      account_type: formData.get("account_type") as components['schemas']['AccountType'],
      number: formData.get("number") as string,
      parent_id: parentId ? Number(parentId) : null,
      currency_id: Number(formData.get("currency") as string)
    }

    const { response } = await accountingClient.PUT("/account/{account_id}/", {
      params: {
        path: {
          account_id: Number(accountId)
        }
      },
      body
    });

    if(response.ok) {
      revalidatePath("/modules/accounting/accounts");

      return {
        status: "success",
        message: "Account updated successfully"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Failed to updated account");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to updated account";
    
    return {
      status: "error",
      message: message
    }
  }
}

export const updateBalanceAccount = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const accountId = formData.get("account_id") as string;
    const balance = formData.get("amount") as string;

    const { response } = await accountingClient.PUT("/account/{account_id}/balance/", {
      params: {
        path: {
          account_id: Number(accountId)
        }
      },
      body: {
        balance: balance
      }
    });

    if (response.ok) {
      revalidatePath("/modules/accounting/accounts");
      revalidatePath(`/modules/accounting/accounts/${accountId}`);

      return {
        status: "success",
        message: "Account balance updated successfully"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Failed to updated account balance");

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to updated account balance";
    
    return {
      status: "error",
      message
    }
  }
}