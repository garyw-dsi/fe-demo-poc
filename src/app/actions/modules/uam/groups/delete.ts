"use server"

import { uamClient } from "@/libs/api/services/uam";
import { revalidatePath } from "next/cache";


export const deleteGroup = async ({ pk }: { pk: number }) => { 
  try {
    const { response } = await uamClient.DELETE("/group/{group_id}/", {
      params: {
        path: {
          group_id: pk
        }
      }
    });

    if (response.status === 204) {
      revalidatePath("/modules/uam/groups");

      return { 
        status: "success",
        message: "Group deleted successfully"
      }
    }

    return { 
      status: "error",
      message: "Error while deleting group"
    }
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "Error while deleting group"
    }
  }
}