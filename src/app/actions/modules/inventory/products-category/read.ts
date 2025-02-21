"use server"

import { inventoryClient } from "@/libs/api/services/inventory";

export const getAllProductsCategory = async ({
  name,
  page,
  page_size
}: {
  name?: string | undefined;
  page: number;
  page_size: number;
  }) => {
  try {
    const { response, data } = await inventoryClient.GET("/product_category/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          name: name || undefined,
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Success get all Product Category",
        data: data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to fetch data");
  } catch (error) {
    const message = error instanceof Error 
      ? error.message
      : "Failed to fetch data";
    
    return {
      status: "error",
      message
    }
  }
}

export const getProductCategory = async ({ pk }: { pk: number }) => { 
  try {
    const { response, data } = await inventoryClient.GET('/product_category/{product_category_id}/', {
      params: {
        path: {
          product_category_id: pk
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Success get Product Category",
        data: data
      }
    }

    if(response.status === 500) {
      throw new Error("Internal server error");
    }

    throw new Error("Failed to fetch Product Category");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch Product Category";
    
    return {
      status: "error",
      message
    }
  }
}

export const getProductCategoryOptions = async ({ name }: { name: string }) => { 
  try {
    const { response, data } = await inventoryClient.GET("/options/product_category/", {
      params: {
        query: {
          name: name
        }
      }
    });

    if (response.ok && data) {
      return {
        status: "success",
        message: "Category options fetched successfully",
        data: data.items
      }
    }

    throw new Error("Failed to fetch category options");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch category options";
    
    return {
      status: "error",
      message
    }
  }
}