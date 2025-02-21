"use server"

import { FormState } from "@/libs/api/constants";
import { uamClient } from "@/libs/api/services/uam";
import { revalidatePath } from "next/cache";


export const createGroup = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const name = formData.get('name') as string;
    const parent_id = formData.get('parent_id') as string;

    const { response } = await uamClient.POST("/group/", {
      body: {
        name: name,
        parent_id: Number(parent_id)
      }
    });

    if (response.status === 200) {
      revalidatePath("/modules/uam/groups");
      return {
        status: "success",
        message: "Group created successfully"
      }
    }

    return {
      status: "error",
      message: "Error while creating group"
    }
  } catch (error) {
    console.log("Create group error:", error);
    return {
      status: "error",
      message: "Error while creating group"
    }
  }
}
