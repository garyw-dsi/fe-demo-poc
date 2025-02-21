"use server"

import { uamClient } from "@/libs/api/services/uam";

export const setOrganizationImage = async ({ pk, image }: { pk: number, image: Blob }) => {
  try {
    const formData = new FormData();
    formData.append('upload', image);

    const { response } = await uamClient.PUT('/organization/{organization_id}/image/', {
      params: {
        path: {
          organization_id: pk
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

export const deleteOrganizationImage = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await uamClient.DELETE("/organization/{organization_id}/image/", {
      params: {
        path: {
          organization_id: pk
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
