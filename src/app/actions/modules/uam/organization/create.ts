"use server"

import { FormState } from "@/libs/api/constants";
import { uamClient } from "@/libs/api/services/uam";
import { revalidatePath } from "next/cache";

export const setOrganizationMaintainer = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const maintainer_id = formData.get('maintainer_id') as string;
    const organization_id = formData.get('organization_id') as string;
    
    const { response,error } = await uamClient.PUT("/organization/{organization_id}/transfer_maintainer/", {
      params: {
        path: {
          organization_id: Number(organization_id)
        }
      },
      body: {
        maintainer_id: Number(maintainer_id)
      }
    });

    if (response.status === 200) { 
      revalidatePath("/modules/uam/organization");
      return {
        status: "success",
        message: "Maintainer transferred successfully"
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
      message: "Error while transferring maintainer"
    }
  } catch (error) {
    console.log("Transfer maintainer error:", error);
    return {
      status: "error",
      message: "Error while transferring maintainer"
    }
  }
}