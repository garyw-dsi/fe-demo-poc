"use server"

import { revalidatePath } from "next/cache";
import { deleteProductImage, setProductImage } from "./image";
import { inventoryClient } from "@/libs/api/services/inventory";
import { components } from "@/libs/api/schema/inventory";
import { validateImage } from "@/utils/image-handler";
import { FormState } from "@/libs/api/constants";

type MediaStatus = "changed" | "deleted" | "unchanged";

export const editProduct = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  try {
    const image = formData.get("image") as Blob;
    const pk = Number(formData.get("pk"));
    const media_status = formData.get("media_status") as MediaStatus;
    
    if (
      image &&
      media_status === "changed"
    ) {
      const imageValidation = validateImage(image);
      if (imageValidation) return imageValidation;
    }

    const price = formData.get("price") || null;
    const currency = formData.get("currency") as string;

    const expenseAccount = formData.get("expense_account_id") as string || null;
    const incomeAccount = formData.get("income_account_id") as string || null;
    const productCategory = formData.get("product_category_id") as string;
    
    const body: components["schemas"]['ProductUpdate'] = {
      name: formData.get("name") as string,
      tags: formData.getAll("tags")
        .filter((tag) => tag !== "")
        .map((tag) => Number(tag)),
      currency_id: Number(currency),
      price: price ? Number(price) : null,
      expense_account_id: expenseAccount ? Number(expenseAccount) : null,
      income_account_id: incomeAccount ? Number(incomeAccount) : null,
      product_category_id: Number(productCategory),
      unit: formData.get("unit") as components['schemas']['Unit'],
    };

    const { response } = await inventoryClient.PUT("/product/{product_id}/", {
      params: {
        path: {
          product_id: Number(pk)
        }
      },
      body: body
    });

    if (response.ok) {
      if (
          image &&
          media_status === "changed"
        ) {
          await setProductImage({
            pk: Number(pk),
            image: image
          });
        }
      
      if (media_status === "deleted") {
        await deleteProductImage({
          pk: Number(pk)
        });
      }

      revalidatePath("/modules/inventory/products");

      return {
        status: "success",
        message: "Product updated successfully"
      };
    }

    return {
      status: "error",
      message: "Failed to update product"
    }

  } catch {
    return {
      status: "error",
      message: "Failed to update product"
    }
  }
}

export const updateProductStock = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const productId = formData.get("product_id") as string;
    const stock = formData.get("stock") as string;

    const { response } = await inventoryClient.PUT("/product/{product_id}/stock/", {
      params: {
        path: {
          product_id: Number(productId)
        }
      },
      body: {
        stock: Number(stock)
      }
    });

    if (response.ok) {
      revalidatePath("/modules/inventory/products");
      revalidatePath(`/modules/inventory/products/${productId}`);
      
      return {
        status: "success",
        message: "Stock updated successfully"
      };
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to update stock");

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to update stock";

    return {
      status: "error",
      message
    }
  }
}