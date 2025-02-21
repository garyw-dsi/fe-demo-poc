"use server"

import { uamClient } from "@/libs/api/services/uam";
import { Context } from "@/app/actions/user";
import { authClient } from "@/libs/api/services/auth";
import { FormState } from "@/libs/api/constants";

const CTX_EMAIL_VERIFICATION: Context = "Verification";

export const requestVerificationLink = async () => { 
  try {
    const { response } = await uamClient.GET("/auth/verification_email/",{
      params: {
        query: {
          context: CTX_EMAIL_VERIFICATION
        }
      }
    });

    if (response.status === 204) {
      return {
        status: 'success',
        message: "Please check your email for verification link"
      }
    }

    return {
      status: 'error',
      message: "Something went wrong, please try again"
    }
  } catch (error) {
    console.log(error)
    return {
      status: 'error',
      message: "Something went wrong, please try again"
    }
  }
}

export const verificationUser = async ({
  token
}: {
  token: string
}): Promise<FormState> => {
  try {
    const { response } = await authClient.GET('/registration_verification/', {
      params: {
        query: {
          token: token
        }
      }
    });

    if (response.status === 200) {
      return { 
        status: 'success',
        message: "User verified successfully"
      }
    }
    
    return {
      status: 'error',
      message: "User verification failed"
    }
  } catch {
    return {
      status: 'error',
      message: "Something went wrong"
    }
  }
}

export const checkUserVerification = async () => { 
  try {
    const { response,data } = await uamClient.GET('/auth/profile/');
    
    if (response.status === 200) {
      return data?.is_verified;
    }

    return false;
  } catch {
    return false;
  }
}