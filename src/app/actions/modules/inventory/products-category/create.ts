"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/inventory"
import { inventoryClient } from "@/libs/api/services/inventory"
import { revalidatePath } from "next/cache"

export const createProductCategory = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const expenseAccount = formData.get('expense_account_id') as string
    const incomeAccount = formData.get('income_account_id') as string

    const body: components['schemas']['ProductCategoryCreate'] = {
      name: formData.get('name') as string,
      expense_account_id: Number(expenseAccount),
      income_account_id: Number(incomeAccount)
    }

    const { response } = await inventoryClient.POST("/product_category/", {
      body: body
    });

    if (response.ok) {
      revalidatePath("/modules/inventory/products/category")

      return {
        status: "success",
        message: "Product category created successfully",
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    } 

    throw new Error("An error occurred")
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to create product category"
    
    return {
      status: "error",
      message
    } 
  }
}