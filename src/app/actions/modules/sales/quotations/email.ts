"use server"

import { FormState } from "@/libs/api/constants"
import { salesClient } from "@/libs/api/services/sales"
import { revalidatePath } from "next/cache"

export const sendQuotationEmail = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => { 
  try {
    const pk = formData.get('pk') as string
    const email = formData.get('email') as string

    const { response } = await salesClient.POST("/quotation/{quotation_id}/send_email/", {
      params: {
        path: {
          quotation_id: Number(pk)
        }
      },
      body: {
        email: email
      }
    });

    if (response.ok) {
      revalidatePath(`/modules/sales/quotations/detail/${pk}`)
      revalidatePath("/modules/sales/quotations")

      return {
        status: "success",
        message: "Email sent successfully"
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Failed to send email")
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to send email"
    
    return {
      status: "error",
      message
    }
  }
}