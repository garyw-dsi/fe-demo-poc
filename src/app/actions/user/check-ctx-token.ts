"use server"

import { authClient } from "@/libs/api/services/auth";
import { Context } from "@/app/actions/user";

interface UserVerificationToken {
  status: "success" | "error";
  message: string;
  data?: {
    scope: Context;
    email: string;
    exp: string;
  } | undefined;
}

export const checkUserVerificationToken = async({
  token
}: {
  token: string;
}): Promise<UserVerificationToken> => {
  try {
    const { response, data } = await authClient.GET("/auth/verification_data/", {
      params: {
        query: {
          token: token
        }
      }
    });

    if (response.ok) {
      if (data) {
        const exp = new Date(data.exp);
        const now = new Date();

        const isExpired = now.getTime() > exp.getTime();

        if (isExpired) {
          return {
            status: 'error',
            message: "Token expired"
          }
        }

        return {
          status: 'success',
          message: "Token verified successfully",
          data: data as UserVerificationToken['data']
        }
      }

      return {
        status: 'error',
        message: "Token invalid"
      }
    }

    return {
      status: 'error',
      message: "Something went wrong"
    }
  } catch {
    return {
      status: 'error',
      message: "Something went wrong"
    }
  }
}