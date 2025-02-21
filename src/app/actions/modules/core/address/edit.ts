"use server"

import { components } from "@/libs/api/schema/core-services";
import { coreClient } from "@/libs/api/services/core";
import { AddressCreate } from "./create";

interface ContactAddressEdit
  extends AddressCreate {
  address_id: number;
  customer_id: number;
}

export const updateContactAddress = async ({
  address_id,
  address,
  address_type,
  phone,
  email,
  phone_code,
  name
}: ContactAddressEdit) => { 
  try {
    const formattedPhone = `${phone_code}${phone}`;
    const body: components['schemas']['AddressUpdate'] = {
      address: address,
      address_type: address_type,
      phone: String(formattedPhone),
      name: name,
      email: email
    };

    const { response } = await coreClient.PUT('/address/{address_id}/', { 
      params: {
        path: {
          address_id: Number(address_id)
        }
      },
      body: body
    });
    return response.ok;
  } catch (error) {
    console.error("Error setting customer address:", error);
    return false;
  }
}