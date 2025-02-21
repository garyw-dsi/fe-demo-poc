"use server"

import { revalidatePath } from "next/cache";

import { FormState } from "@/libs/api/constants";
import { validateImage } from "@/utils/image-handler";

import { uamClient } from "@/libs/api/services/uam";
import { deleteUserImage, setUserImage } from "./image";

type Status = "changed" | "deleted" | "unchanged";

export const editUser = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const image = formData.get("image") as Blob;
    const mediaStatus = formData.get("media_status") as Status;
    
    if (
      image &&
      mediaStatus === "changed"
    ) {
      const imageValidation = validateImage(image);
      if (imageValidation) return imageValidation;
    }

    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const group_id = formData.get("group_id") as string;
    const user_id = formData.get("user_id") as string;
    const is_locked = formData.get("is_locked") as string;
    const is_active = formData.get("is_active") as string;

    const { response, error } = await uamClient.PUT("/user/{user_id}/", {
      params: {
        path: {
          user_id: Number(user_id)
        }
      },
      body: {
        first_name: first_name,
        last_name: last_name,
        group_id: Number(group_id),
        structure_id: null,
        is_locked: is_locked === "true",
        is_active: is_active === "true"
      }
    });

    if (response.status === 200) {
      if (
        image &&
        mediaStatus === "changed"
      ) {
        await setUserImage({
          pk: Number(user_id),
          image: image
        });
      }
    
      if (mediaStatus === "deleted") {
        await deleteUserImage({
          pk: Number(user_id)
        })
      }
      
      revalidatePath("/modules/uam/users");
      revalidatePath(`/modules/uam/users/${user_id}`);

      return {
        status: "success",
        message: "User has been updated successfully"
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
      message: "Failed to update user"
    }

  } catch  {
    return {
      status: "error",
      message: "Failed to update user"
    }
  }
}
