"use server"

import { components } from "@/libs/api/schema/inventory";
import { inventoryClient } from "@/libs/api/services/inventory";

interface Products {
  page: number;
  page_size: number;
  name?: string;
  product_type?: components["schemas"]["ProductType"] 
}

export const getAllProducts = async ({
  page,
  page_size,
  name,
  product_type
}: Products) => {
  try {
    const { response, data } = await inventoryClient.GET("/product/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          name__icontains: name || undefined,
          product_type: product_type
        }
      }
    });

    if (response.ok && data) {
      return {
        status: "success",
        data: data
      }
    }

    return {
      status: "error",
      message: "Failed to fetch data"
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to fetch data"
    }
  }
}

export const getDetailProduct = async ({ pk }: { pk: number }) => { 
  try {
    const { response, data } = await inventoryClient.GET("/product/{product_id}/", {
      params: {
        path: {
          product_id: pk
        }
      }
    });

    if (response.ok && data) {
      return {
        status: "success",
        message: "Data fetched successfully",
        data: data
      }
    } 

    return {
      status: "error",
      message: "Failed to fetch data"
    }
  } catch (error) {
    console.log(error);
    return {
      status: "error",
      message: "Failed to fetch data" 
    }
  }
}

export const getProductOptions = async ({ name }: { name: string }) => {
  try {
    const { response, data } = await inventoryClient.GET("/options/product/", {
      params: {
        query: {
          name__icontains: name
        }
      }
    });

    if(response.ok && data) {
      return data.items;
    }

    return null;
  } catch{
    return null;
  }
}