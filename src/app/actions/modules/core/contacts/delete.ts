"use server"

import { NEXT_TAG_CONTACTS } from "@/constants/modules/core/contacts";
import { FormState } from "@/libs/api/constants";
import { coreClient } from "@/libs/api/services/core";
import { revalidateTag } from "next/cache";

export const deleteContact = async({
  contactId
}: {
  contactId: number
}): Promise<FormState> => {
  try {
    const { response } = await coreClient.DELETE("/contact/{contact_id}/", {
      params: {
        path: {
          contact_id: contactId
        }
      }
    });

    if (response.ok) {
      NEXT_TAG_CONTACTS.map((tag) => revalidateTag(tag));

      return {
        status: "success",
        message: "Contact deleted successfully"
      }
    }

    return {
      status: "error",
      message: "Failed to delete Contact"
    }

  } catch {
    return {
      status: "error",
      message: "Failed to delete Contact"
    }
  }
}

export const softDeleteContact = async ({
  contactId
}: {
  contactId: number
}): Promise<FormState> => {
  try {
    const { response } = await coreClient.DELETE("/contact/{contact_id}/soft_delete", {
      params: {
        path: {
          contact_id: contactId
        }
      }
    });

    if (response.ok) {
      NEXT_TAG_CONTACTS.map((tag) => revalidateTag(tag));

      return {
        status: "success",
        message: "Contact deleted successfully"
      }
    }
    throw new Error("Failed to delete Contact");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to delete Contact";
    
    return {
      status: "error",
      message
    }
  }
}