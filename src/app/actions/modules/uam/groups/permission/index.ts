"use server"

import { FormState } from "@/libs/api/constants";
import { uamClient } from "@/libs/api/services/uam"
import { revalidatePath, revalidateTag } from "next/cache";

export const getPermissionList = async () => { 
  try {
    const { response, data } = await uamClient.GET('/permission/');
    if(response.status === 200) {
      return {
        status: "success",
        data: data
      }
    }
    return {
      status: "error",
      message: "Failed to fetch permission list"
    }
  } catch  {
    return {
      status: "error",
      message: "Failed to fetch permission list"
    }
  }
}

export const setPermissions = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const group_id = formData.get("group_id")
    const permissions = formData.getAll("permissions[]");
    console.log(group_id);
    console.log(permissions?.toString());

    const { response } = await uamClient.PUT("/group/{group_id}/permissions/", {
      params: {
        path: {
          group_id: Number(group_id)
        }
      },
      body: {
        permission_ids: permissions.map(Number)
      }
    })

    if (response.status === 200) {
      revalidatePath(`/modules/uam/groups/detail/${group_id}`)
      revalidatePath(`/modules/uam/groups/create/${group_id}/permission`)
      
      revalidateTag("group_permissions")

      return {
        status: "success",
        message: "Successully set permission for this group"
      }
    }
    
    return {
      status: "error",
      message: "Failed to set permission for this group"
    }

  } catch (error) {
    console.log(error)
    return { 
      message: "error",
      status: "error"
    }
  }  
}