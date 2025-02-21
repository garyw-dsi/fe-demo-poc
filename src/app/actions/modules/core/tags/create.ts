import { NEXT_TAG_TAGS } from "@/constants/modules/core/tags";
import { FormState } from "@/libs/api/constants";
import { coreClient } from "@/libs/api/services/core";
import { revalidateTag } from "next/cache";

interface CreateNewTag extends FormState {
  data?: {
    pk: number;
    name: string;
  };
}

export const createNewTag = async (
  prevState: CreateNewTag,
  formData: FormData
): Promise<CreateNewTag> => {
  try {
    const name = formData.get("name") as string;

    const { response, data } = await coreClient.POST("/tag/", {
      body: {
        name: name
      },
    });

    if (response.ok && data) {
      NEXT_TAG_TAGS.map((tag) => revalidateTag(tag));

      return {
        status: "success",
        message: "Success created tag",
        data: {
          pk: data.pk,
          name: data.name
        }
      }
    }

    if (response.status === 400) { 
      throw new Error("Tag already exists")
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Error created tag")
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Error created tag";
    
    return {
      status: "error",
      message
    }
  }
}