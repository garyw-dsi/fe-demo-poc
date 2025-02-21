"use server"

import { FormState } from "@/libs/api/constants";
import { authClient } from "@/libs/api/services/auth";
import { Context } from "@/app/actions/user";
import logger from "@/libs/logger";

const CTX_RESET_PASSWORD: Context = "Reset Password";

export const requestResetPassword = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  try {
    const email = formData.get("email") as string;

    const { response, error } = await authClient.GET("/auth/verification_email/", {
      params: {
        query: {
          context: CTX_RESET_PASSWORD,
          email: email
        }
      }
    });

    if (response.ok) {
      logger.info("Password reset link sent", { email });

      return {
        status: 'success',
        message: "Please check your email for password reset link"
      }
    }

    logger.error("Error while sending password reset link", { email, response, error });

    throw new Error("Error while sending password reset link");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Error while sending password reset link";
    
    return {
      status: 'error',
      message
    }
  }
}

export const userResetPassword = async(
  prevState: FormState,
  formData: FormData
):Promise<FormState> => {
  try {
    const new_password = formData.get("password") as string;
    const token = formData.get("token") as string;

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