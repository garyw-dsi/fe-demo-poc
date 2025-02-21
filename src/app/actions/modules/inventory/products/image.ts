"use server"

import { inventoryClient } from "@/libs/api/services/inventory";

export const setProductImage = async ({ pk, image }: { pk: number, image: Blob }) => {
  try {
    const formData = new FormData();
    formData.append('upload', image);

    const { response,  error } = await inventoryClient.PUT('/product/{product_id}/image/', {
      params: {
        path: {
          product_id: pk
        }
      },
      // @ts-expect-error error type
      body: formData
    });

    console.log(response);
    console.log(error)

    if (response.ok) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteProductImage = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await inventoryClient.DELETE("/product/{product_id}/image/", {
      params: {
        path: {
          product_id: pk
        }
      }
    });
    console.log('response deleted', response)

    if (response.ok) {
      return true
    }

    return false
  } catch (error) {
    console.log(error)
    return false
  }
}