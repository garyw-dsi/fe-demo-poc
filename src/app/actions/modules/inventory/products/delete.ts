"use server"

import { inventoryClient } from "@/libs/api/services/inventory";

export const deleteProduct = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await inventoryClient.DELETE("/product/{product_id}/", {
      params: {
        path: {
          product_id: pk
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Product deleted successfully"
      }
    }

    return {
      status: "error",
      message: "Failed to delete product"
    }
  } catch {
    return {
      status: "error",
      message: "Failed to delete product"
    }
  }
}