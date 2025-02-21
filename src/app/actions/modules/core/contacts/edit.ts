"use server";

import { revalidateTag } from "next/cache";
import { FormState } from "@/libs/api/constants";
import { components } from "@/libs/api/schema/core-services";
import { coreClient } from "@/libs/api/services/core";
import { validateImage } from "@/utils/image-handler";
import {
  deleteContactImage,
  setContactImage
} from "./image";
import {
  deleteContactAddress,
  editAddressValidator,
  setContactAddress,
  updateContactAddress
} from "../address";
import {
  deleteContactIndustry,
  type EditIndustry,
  setContactIndustry,
  updateContactIndustry
} from "../industry";
import { NEXT_TAG_CONTACTS } from "@/constants/modules/core/contacts";

type Status = "changed" | "deleted" | "unchanged";

const constructCustomerBody = (
  formData: FormData
): components["schemas"]['ContactUpdate'] => ({
  name: formData.get("name") as string,
  legal_type: formData.get("legal_type") as components['schemas']['ContactLegalType'],
  tax_id: formData.get("tax_id") as string,
  tags: formData.getAll("tags")
    .filter((tag) => tag !== "")
    .map((tag) => Number(tag)),
  parent_id: Number(formData.get("parent_id")) || null,
});

export const updateContact = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const contactId = Number(formData.get("pk"));
    
    const image = formData.get("image") as Blob;
    const mediaStatus = formData.get("media_status") as Status;
    
    if (
      image &&
      mediaStatus === "changed"
    ) {
      const imageValidation = validateImage(image);
      if (imageValidation) return imageValidation;
    }

    const customerBody = constructCustomerBody(formData);
    
    const { response } = await coreClient.PUT('/contact/{contact_id}/', {
      params: {
        path: {
          contact_id: contactId
        }
      },
      body: customerBody
    });

    if (!response.ok) {
      return createErrorResponse("Failed to update contact");
    }

    if (
      image &&
      mediaStatus === "changed"
    ) {
      await setContactImage({
        pk: Number(contactId),
        image: image
      });
    }
  
    if (mediaStatus === "deleted") {
      await deleteContactImage({
        pk: Number(contactId)
      });
    }
    
    await handleAddressChanges(formData, contactId);
    await handleIndustryChanges(formData, contactId);

    NEXT_TAG_CONTACTS.map((tag) => revalidateTag(tag));

    return {
      status: "success",
      message: "Contact updated successfully"
    };
  } catch {
    return createErrorResponse("Failed to update contact");
  }
}

const handleAddressChanges = async (
  formData: FormData,
  contactId: number
) => {
  const addressDeleted = formData.getAll("address_deleted").map(Number);

  await Promise.all(
    addressDeleted
      .map((pk) => deleteContactAddress({ address_id: pk }))
  )

  const addressData = formData.get("address") as string;
  const parsedAddresses = JSON.parse(addressData) || [];

  if (parsedAddresses.length > 0) {
    const validAddresses = await editAddressValidator(parsedAddresses);
    await Promise.all(
      validAddresses
        .map((address) => {
          if (address.pk) {
            return updateContactAddress({
              address_id: address.pk,
              customer_id: contactId,
              address: address.address,
              address_type: address.address_type,
              phone: address.phone,
              email: address.email,
              phone_code: address.phone_code,
              name: address.name,
            });
          } else {
            return setContactAddress({
              pk: contactId,
              address: address.address,
              address_type: address.address_type,
              phone: address.phone,
              email: address.email,
              name: address.name,
              phone_code: address.phone_code,
            });
          }
    }))
  }
}

const handleIndustryChanges = async (
  formData: FormData,
  contactId: number
) => {
  const industryDeleted = formData.getAll("industry_deleted").map(Number);

  await Promise.all(
    industryDeleted
      .map((pk) => deleteContactIndustry({ industry_id: pk }))
  )

  
  const industryData = formData.get("industry") as string;
  const parsedIndustry = JSON.parse(industryData) as EditIndustry[] || []

  if (parsedIndustry.length > 0) {
    await Promise.all(
      parsedIndustry
        .map((industry) => {
          if (industry.pk) {
            return updateContactIndustry({
              industry_id: industry.pk,
              type: industry.type
            })
          }
          else {
            return setContactIndustry({
              industry_type: industry.type,
              pk: contactId
            })
          }
        })
    )
  }
}

const createErrorResponse = (message: string): FormState => ({
  status: "error",
  message,
})
