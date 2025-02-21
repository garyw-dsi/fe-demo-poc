import { NEXT_TAG_TAGS } from "@/constants/modules/core/tags";
import { coreClient } from "@/libs/api/services/core";

export const getTagOptions = async ({ name }: { name?: string | ""}) => {
  try {
    const { response, data } = await coreClient.GET("/options/tag/", {
      params: {
        query: {
          // name: name,
          name__icontains: name
        }
      },
      next: { tags: NEXT_TAG_TAGS }
    });

    if (response.ok && data) {
      return data.items
    }

    return null
  } catch {
    return null
  }
}

interface GetAllTags {
  page: number;
  page_size: number;
  name?: string;
}

export const getAllTags = async ({ page, page_size, name }: GetAllTags) => { 
  try {
    const { response, data } = await coreClient.GET("/tag/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          name: name || undefined
        }
      },
      next: { tags: NEXT_TAG_TAGS }
    });

    if (
      response.ok &&
      data
    ) {
      return {
        status: "success",
        message: "Success get all tags",
        data: data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Error get all tags")
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Error get all tags"
    
    return {
      status: "error",
      message
    }
  }
}