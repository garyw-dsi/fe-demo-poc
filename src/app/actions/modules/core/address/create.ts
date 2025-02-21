"use server"

import { components } from "@/libs/api/schema/core-services";
import { coreClient } from "@/libs/api/services/core";

export interface AddressCreate {
  address: string;
  address_type: components['schemas']['AddressType'];
  phone: string;
  phone_code: string;
  email: string;
  name: string;
}

interface ContactAddress
  extends AddressCreate {
  pk: number;
}

export const setContactAddress = async ({
  pk,
  address,
  address_type,
  phone,
  email,
  phone_code,
  name
}: ContactAddress) => { 
  try {
    const formattedPhone = `${phone_code}${phone}`;
    const body: components['schemas']['AddressCreate'] = {
      contact_id: pk,
      address: address,
      address_type: address_type,
      phone: String(formattedPhone),
      name: name,
      email: email
    };

    const { response } = await coreClient.POST('/address/', { body });
    return response.ok;
  } catch (error) {
    console.error("Error setting customer address:", error);
    return false;
  }
}