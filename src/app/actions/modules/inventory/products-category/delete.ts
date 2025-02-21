"use server"

import { FormState } from "@/libs/api/constants"
import { inventoryClient } from "@/libs/api/services/inventory"

export const deleteProductCategory = async ({
  pk
}: {
  pk: number
}): Promise<FormState> => { 
  try {
    const { response } = await inventoryClient.DELETE("/product_category/{product_category_id}/", {
      params: {
        path: {
          product_category_id: pk
        }
      }
    })

    if (response.ok) {
      return {
        status: "success",
        message: "Product category deleted successfully"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Failed to delete product category")
  } catch (error) {
    const message = error instanceof Error 
      ? error.message 
      : "Failed to delete product category"
    
    return {
      status: "error",
      message
    }
  }
}