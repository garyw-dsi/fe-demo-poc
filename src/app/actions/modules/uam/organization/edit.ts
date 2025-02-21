"use server"

import { FormState } from "@/libs/api/constants";
import { components } from "@/libs/api/schema/uam";
import { uamClient } from "@/libs/api/services/uam";
import { validateImage } from "@/utils/image-handler";
import { revalidatePath } from "next/cache";
import { deleteOrganizationImage, setOrganizationImage } from "./image";

type LegalType = components["schemas"]["Organization"]["legal_type"];
type Status = "changed" | "deleted" | "unchanged";

export const editOrganization =  async (
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

    const legal_name = formData.get('legal_name') as string;
    const legal_type = formData.get('legal_type') as LegalType;
    const organization_id = formData.get('organization_id') as string;

    const { response , error} = await uamClient.PUT("/organization/{organization_id}/", {
      params: {
        path: {
          organization_id: Number(organization_id)
        }
      },
      body: {
        legal_name: legal_name,
        legal_type: legal_type
      },
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.status === 200) {
      if (
        image &&
        mediaStatus === "changed"
      ) {
        await setOrganizationImage({
          pk: Number(organization_id),
          image: image
        });
      }
    
      if (mediaStatus === "deleted") {
        await deleteOrganizationImage({
          pk: Number(organization_id)
        })
      }

      revalidatePath("/modules/uam/organization");

      return {
        status: "success",
        message: "Organization updated successfully"
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
      message: "Error while updating organization"
    }

  }catch (error) {
    console.log("Update organization error:", error);
    return {
      status: "error",
      message: "Error while updating organization"
    }
  }
}