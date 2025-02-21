"use server"

import { FormState } from "@/libs/api/constants";
import { uamClient } from "@/libs/api/services/uam";
import { validateImage } from "@/utils/image-handler";
import { revalidatePath } from "next/cache";
import { setUserImage } from "./image";

export const createUser = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const image = formData.get("image") as Blob;
    const imageValidation = image ? validateImage(image) : null;

    if (imageValidation) return imageValidation;

    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const group_id = formData.get("group_id") as string;

    const { response, error, data } = await uamClient.POST("/user/", {
      body: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        group_id: Number(group_id),
        structure_id: null,
      }
    });

    if (response.ok) {
      if (data) {
        const userId = data.pk;

        if (image) {
          await setUserImage({
            pk: userId,
            image: image
          })
        }
      }
      
      revalidatePath("/modules/uam/users");

      return {
        status: "success",
        message: "User has been created successfully"
      }
    }

    if (response.status === 400) {
      return {
        status: "error",
        message: String(error?.detail)
      }
    }

    return {
      status: "error",
      message: "Failed to create user"
    }

  } catch  {
    return {
      status: "error",
      message: "Failed to create user"
    }
  }
}