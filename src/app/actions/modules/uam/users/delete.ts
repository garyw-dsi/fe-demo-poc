"use server"

import { uamClient } from "@/libs/api/services/uam";
import logger from "@/libs/logger";
import { revalidatePath } from "next/cache";

export const deleteUser = async ({ pk }: { pk: number }) => {
  try {
    const { response, error } = await uamClient.DELETE("/user/{user_id}/", {
      params: {
        path: {
          user_id: pk
        }
      }
    });

    if (response.status === 204) {
      revalidatePath("/modules/uam/users");

      logger.info("User deleted successfully", { pk });

      return { 
        status: "success",
        message: "User deleted successfully"
      }
    }

    logger.error("Error while deleting user", { response, error });

    throw new Error("Error while deleting user");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Error while deleting user";
    
    logger.error("Error while deleting user", { message, error });
    
    return {
      status: "error",
      message
    }
  }
}
