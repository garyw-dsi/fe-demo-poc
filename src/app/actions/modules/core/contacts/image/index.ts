"use server"

import { coreClient } from "@/libs/api/services/core";

export const setContactImage = async ({ pk, image }: { pk: number, image: Blob }) => {
  try {
    const formData = new FormData();
    formData.append('upload', image);

    const { response } = await coreClient.PUT('/contact/{contact_id}/image/', {
      params: {
        path: {
          contact_id: pk
        }
      },
      // @ts-expect-error error type
      body: formData
    });

    if (response.ok) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteContactImage = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await coreClient.DELETE("/contact/{contact_id}/image/", {
      params: {
        path: {
          contact_id: pk
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