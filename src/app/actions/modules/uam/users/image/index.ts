"use server"

import { uamClient } from "@/libs/api/services/uam";

export const setUserImage = async ({ pk, image }: { pk: number, image: Blob }) => {
  try {
    const formData = new FormData();
    formData.append('upload', image);

    const { response } = await uamClient.PUT('/user/{user_id}/image/', {
      params: {
        path: {
          user_id: pk
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

export const deleteUserImage = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await uamClient.DELETE("/user/{user_id}/image/", {
      params: {
        path: {
          user_id: pk,
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
