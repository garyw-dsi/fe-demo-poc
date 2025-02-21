"use server"

import { crmClient } from "@/libs/api/services/crm"
import { revalidatePath } from "next/cache";
import { deleteContact } from "@/app/actions/modules/core/contacts";

/**
 * 
 * @param pk
 * @param cid
 * 
 * @description
 * delete the customer from the customer module
 * 
 * 'pk' is the customer id
 * 
 * 'cid' is the contact id
 * @returns 
 */
export const deleteCustomer = async ({
  pk, cid
}: {
  pk: number;
  cid: number | null;
}) => {
  try {
    const { response } = await crmClient.DELETE("/customer/{customer_id}/", {
      params: {
        path: {
          customer_id: Number(pk)
        }
      }
    });

    if (response.ok) {
      if (cid) {
        await deleteContact({ contactId: cid })
      }
      
      revalidatePath("/modules/crm/customers")
      
      return {
        status: "success",
        message: "Customer deleted successfully"
      }
    }

    return { 
      status: "error",
      message: "Failed to delete customer"
    }
  } catch {
    return { 
      status: "error",
      message: "Failed to delete customer"
    }
  }
}