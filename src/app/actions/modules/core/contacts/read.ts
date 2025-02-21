"use server"

import { NEXT_TAG_CONTACTS } from "@/constants/modules/core/contacts";
import { components } from "@/libs/api/schema/core-services";
import { coreClient } from "@/libs/api/services/core";
import { getContactAddressById } from "@/app/actions/modules/core/address";
import { getContactIndustryById } from "@/app/actions/modules/core/industry";

export const getContactOptions = async ({ name }: { name: string }) => { 
  try {
    const { response, data } = await coreClient.GET("/options/contact/", {
      params: {
        query: {
          name: name
        }
      },
      next: { tags: NEXT_TAG_CONTACTS }
    });

    if (response.ok && data) {
      return data.items
    }

    return null
  } catch {
    return null
  }
}

interface Contacts {
  page: number;
  page_size: number;
  name?: string | undefined;
  parent_id?: number | undefined;
  legal_type?: components['schemas']['ContactLegalType'] | undefined;
  archived?: boolean;
}

export const getAllContacts = async ({
  page,
  page_size,
  name,
  parent_id,
  legal_type,
  archived = true
}: Contacts) => {
  try {
    const { response, data } = await coreClient.GET("/contact/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          name__icontains: name || undefined,
          parent_id: parent_id || undefined,
          legal_type: legal_type || undefined,
          deleted_at__isnull: archived
        }
      },
      next: { tags: NEXT_TAG_CONTACTS }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Success get all contact",
        data: data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Error fetched contact")

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "error fetched contact"
    
    return {
      status: "error",
      message
    }
  }
}

export const getContact = async ({
  contactId
}: {
  contactId: number
}) => { 
  try {
    const { response, data } = await coreClient.GET("/contact/{contact_id}/", {
      params: {
        path: {
          contact_id: contactId
        }
      }
    });

    if (
      response.ok &&
      data
    ) {
      const [contactAddress, contactIndustry] = await Promise.all([
        getContactAddressById({ contactId }),
        getContactIndustryById({ contactId })
      ]);

      if (
        !contactAddress ||
        !contactIndustry
      ) {
        throw new Error("Failed to fetch contact");
      }

      return {
        status: "success",
        message: "Fetched contact successfully",
        data: {
          contact: data,
          address: contactAddress.data,
          industry: contactIndustry.data
        }
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    if (response.status === 404) {
      throw new Error("Contact not found")
    }

    throw new Error("Failed to fetch contact");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch contact";
    
    return {
      status: "error",
      message
    }
  }
}