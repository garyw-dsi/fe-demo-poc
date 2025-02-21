"use server"

import { revalidatePath } from "next/cache";
import { setProductImage } from "./image";
import { inventoryClient } from "@/libs/api/services/inventory";
import { components } from "@/libs/api/schema/inventory";
import { validateImage } from "@/utils/image-handler";
import { FormState } from "@/libs/api/constants";

export const createProduct = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const image = formData.get("image") as Blob;
    const imageValidation = image ? validateImage(image) : null;

    if (imageValidation) return imageValidation;

    const price = formData.get("price") || null;
    const currency = formData.get("currency") as string;

    const expenseAccount = formData.get("expense_account_id") as string || null;
    const incomeAccount = formData.get("income_account_id") as string || null;
    const productCategory = formData.get("product_category_id") as string;
    
    const body: components["schemas"]['ProductCreate'] = {
      name: formData.get("name") as string,
      product_type: formData.get("product_type") as components["schemas"]["ProductType"],
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

    const { response, data } = await inventoryClient.POST("/product/", {
      body: body
    });

    if (response.ok && data) {
      const pk = data.pk;

      if (image) {
        await setProductImage({
          pk: pk,
          image: image, 
        });
      }

      revalidatePath("/modules/inventory/products");

      return {
        status: "success",
        message: "Product created successfully"
      };
    }

    return {
      status: "error",
      message: "Failed to create product"
    };
  } catch {
    return {
      status: "error",
      message: "Failed to create product"
    };
  }
};