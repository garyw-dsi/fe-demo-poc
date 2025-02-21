"use server"

import { FormState } from "@/libs/api/constants"
import { authClient } from "@/libs/api/services/auth";
import { verificationUser } from "./verification";

export const userRegistration = async(
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const token = formData.get("token") as string;
    const { status, message } = await verificationUser({ token });

    if (status === 'error') {
      return {
        status: 'error',
        message: message as string
      }
    }

    const new_password = formData.get("password") as string;

    const { response } = await authClient.PUT("/reset_password/", {
      body: {
        new_password: new_password,
        token: token
      }
    });

    if (response.ok) {
      return {
        status: 'success',
        message: "New Password Set successfully"
      }
    }

    return {
      status: 'error',
      message: "Something went wrong, please try again"
    }

  } catch {
    return {
      status: 'error',
      message: "Something went wrong, please try again"
    }
  }
}