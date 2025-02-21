"use server"

import { FormState } from "@/libs/api/constants";
import { authClient } from "@/libs/api/services/auth";
import { Context } from "@/app/actions/user";

const CTX_CHANGE_PASSWORD: Context = "Change Password";

export const requestChangePassword = async ({ email }: { email: string }) => {
  try {
    const { response } = await authClient.GET("/auth/verification_email/", {
      params: {
        query: {
          context: CTX_CHANGE_PASSWORD,
          email: email
        }
      }
    });

    if (response.ok) {
      return {
        status: 'success',
        message: "Please check your email for change password link"
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

export const userChangePassword = async(
  prevState: FormState,
  formData: FormData
):Promise<FormState> => {
  try {
    const token = formData.get("token") as string;

    const old_password = formData.get("old_password") as string;
    const new_password = formData.get("new_password") as string;

    const { response, error } = await authClient.PUT("/change_password/", {
      body: {
        token: token,
        old_password: old_password,
        new_password: new_password
      }
    });

    if (response.ok) {
      return {
        status: 'success',
        message: "Password change successfully"
      }
    }

    if (!response.ok) {
      return {
        status: 'error',
        message: String(error?.detail)
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