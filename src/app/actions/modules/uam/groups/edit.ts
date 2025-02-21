"use server"

import { FormState } from "@/libs/api/constants";
import { uamClient } from "@/libs/api/services/uam";
import { revalidatePath } from "next/cache";


export const updateGroupById = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const name = formData.get('name') as string;
    const parent_id = formData.get('parent_id') as string;
    const group_id = formData.get('pk');

    const { response , error} = await uamClient.PUT("/group/{group_id}/", {
      params: {
        path: {
          group_id: Number(group_id)
        }
      },
      body: {
        name: name,
        parent_id: Number(parent_id)
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 200) {
      revalidatePath("/modules/uam/groups");
      revalidatePath(`/modules/uam/groups/${group_id}`);

      return {
        status: "success",
        message: "Group updated successfully"
      }
    }

    if (error) {
      return {
        status: "error",
        message: String(error.detail)
      }
    }

    return {
      status: "error",
      message: "Error while updating group"
    }

  }catch (error) {
    console.log("Update group error:", error);
    return {
      status: "error",
      message: "Error while updating group"
    }
  }
}