/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { FormState } from "@/libs/api/constants";
import { authClient } from "@/libs/api/services/auth";
import logger from "@/libs/logger";

export const signUp = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const first_name = formData.get('first_name') as string;
  const last_name = formData.get('last_name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    logger.info(
      "Creating account:",
      {
        first_name,
        last_name,
        email
      }
    );

    const { response, error } = await authClient.POST("/user/initial/", {
      body: {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorMessage = error?.detail || "Error while registering your account";

      logger.error("Registration error:", { errorMessage });
      logger.error("Registration response:", response)

      return {
        message: String(errorMessage),
        status: "error",
      };
    }

    logger.info(
      "Account created successfully:",
      {
        first_name,
        last_name,
        email
      }
    );

    return {
      message: "Account created successfully",
      status: "success",
    };
  } catch (error) {
    logger.error("Registration error:", error);

    return {
      message: "Error while registering your account",
      status: "error",
    };
  }
};
