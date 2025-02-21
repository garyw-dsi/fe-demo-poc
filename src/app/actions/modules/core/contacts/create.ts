"use server"

import { NEXT_TAG_CONTACTS } from "@/constants/modules/core/contacts"
import { FormState } from "@/libs/api/constants"
import { components } from "@/libs/api/schema/core-services"
import { coreClient } from "@/libs/api/services/core"
import { revalidateTag } from "next/cache"
import { createContactCustomer } from "@/app/actions/modules/crm/customers"
import { validateImage } from "@/utils/image-handler"
import { setContactImage } from "./image"
import { setContactIndustry } from "@/app/actions/modules/core/industry"
import { addressValidator, setContactAddress } from "@/app/actions/modules/core/address"

interface SetContact 
  extends FormState {
    data?: components['schemas']['Contact']
}
/**
 * @param data
 * @description
 * this function will create a new contact
 * @returns 'contact'
 */
const setContact = async ({
  body
}: {
  body: components['schemas']['ContactCreate']
}): Promise<SetContact> => {
  try {
    const { response, data, error } = await coreClient.POST("/contact/", {
      body: {
        legal_type: body.legal_type,
        name: body.name,
        tags: body.tags,
        parent_id: body.parent_id,
        tax_id: body.tax_id
      }
    });

    if (response.ok && data) {
      NEXT_TAG_CONTACTS.map((tag) => revalidateTag(tag));

      return {
        status: "success",
        message: "Success created contact",
        data: data
      }
    }
    
    if (response.status === 401) {
      return {
        status: "error",
        message: "Unauthorized Access, permission required [create_contact]"
      }
    }

    return {
      status: "error",
      message: String(error?.detail)
    }

  } catch {
    return {
      status: "error",
      message: "Error created contact",
    }
  }
}

export const createContact = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const image = formData.get("image") as Blob;
    const imageValidation = image ? validateImage(image) : null;

    if (imageValidation) return imageValidation;

    const body: components['schemas']['ContactCreate'] = {
      name: formData.get("name") as string,
      legal_type: formData.get("legal_type") as components['schemas']['ContactLegalType'],
      tax_id: formData.get("tax_id") as string,
      tags: formData.getAll("tags")
        .filter((tag) => tag !== "")
        .map((tag) => Number(tag)),
      parent_id: Number(formData.get("parent_id")) || null,
    };

    const { status, message, data } = await setContact({ body });

    if (status === 'error') {
      return {
        status: 'error',
        message: message as string
      }
    }

    if (data) {
      const contactId = data.pk;
      const isCustomer = formData.get("is_customer") as string;

      if (
        isCustomer &&
        isCustomer === 'true'
      ) {
        await createContactCustomer({ contactId });
      }

      if (image) {
        await setContactImage({
          pk: contactId,
          image: image
        });
      }

      const industry_type = formData
        .getAll("industry_type")
        .filter((industry) => industry !== "");

      if (industry_type) {
        industry_type
          .map((industry) => { 
            setContactIndustry({
              pk: contactId,
              industry_type: industry as components['schemas']['IndustryType']
            });
          })
      }

      const addresses = formData.get("address") as string;
      const parsedAddresses = JSON.parse(addresses);
    
      const validAddresses = await addressValidator(parsedAddresses);

      if (validAddresses.length > 0) {
        validAddresses
          .map((address) => {
            setContactAddress({
              pk: contactId,
              address: address.address,
              address_type: address.address_type,
              phone: String(address.phone),
              email: address.email as string,
              name: address.name as string,
              phone_code: address.phone_code as string
            });
          });
      }

      NEXT_TAG_CONTACTS.map((tag) => revalidateTag(tag));
      
      return {
        status: "success",
        message: "Contact created successfully",
      }
    }

    return {
      status: 'success',
      message: "Contact created successfully",
    }
  } catch {
    return {
      status: 'error',
      message: "Error created contact"
    }
  }
}

export const importContact = async({ file }: {file: FormData}) => {
  try {
    const contact = file.get("file") as File;

    const formData = new FormData();
    formData.append("upload", contact);

    const { response } = await coreClient.POST("/contact_upload/", {
      // @ts-expect-error error type
      body: formData
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Success import contact"
      }
    }
    throw new Error("Error import contact");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Error import contact";
    
    return {
      status: "error",
      message
    }
  }
}