"use server"

import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/inventory"
import { inventoryClient } from "@/libs/api/services/inventory"
import { revalidatePath } from "next/cache"

export const updateProductCategory = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const categoryId = formData.get('category_id') as string

    const expenseAccount = formData.get('expense_account_id') as string
    const incomeAccount = formData.get('income_account_id') as string

    const body: components['schemas']['ProductCategoryUpdate'] = {
      name: formData.get('name') as string,
      expense_account_id: Number(expenseAccount),
      income_account_id: Number(incomeAccount)
    }

    const { response } = await inventoryClient.PUT("/product_category/{product_category_id}/", {
      params: {
        path: {
          product_category_id: Number(categoryId)
        }
      },
      body: body
    });

    if (response.ok) {
      revalidatePath("/modules/inventory/products/category")

      return {
        status: "success",
        message: "Product category updated successfully",
      }
    }

    if (response.status === 404) {
      throw new Error("Product category not found")
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    } 

    throw new Error("An error occurred")
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to update product category"
    
    return {
      status: "error",
      message
    } 
  }
}