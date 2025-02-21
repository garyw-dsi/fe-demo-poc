"use server"

import { coreClient } from "@/libs/api/services/core";

export const deleteContactAddress = async({
  address_id
}: {
  address_id: number;
}) => {
  try {
    const { response } = await coreClient.DELETE("/address/{address_id}/", {
      params: {
        path: {
          address_id: Number(address_id)
        }
      }
    })

    return response.ok;
  } catch {
    return false;
  }
}