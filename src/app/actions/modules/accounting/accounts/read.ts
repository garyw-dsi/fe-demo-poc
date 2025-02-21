"use server"

import { accountingClient } from "@/libs/api/services/accounting";

interface GetAllAccountsParams {
  page: number;
  page_size: number;
  name?: string;
}

export const getAllAccounts = async ({
  page,
  page_size,
  name
}: GetAllAccountsParams) => { 
  try {
    const { response, data } = await accountingClient.GET("/account/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          name: name || undefined
        }
      }
    });

    if (response.ok) {
      return {
        status: "success",
        message: "Accounts fetched successfully",
        data: data
      }
    }

    if (response.status === 500) {
      throw new Error("Internal server error")
    }

    throw new Error("Failed to fetch accounts")
  } catch (error) {
    const message = error instanceof Error 
      ? error.message
      : "Failed to fetch accounts"
    
    return {
      status: "error",
      message
    }
  }
}

export const getAccount = async ({ pk }: { pk: number }) => { 
  try {
    const { response, data } = await accountingClient.GET("/account/{account_id}/", {
      params: {
        path: {
          account_id: Number(pk)
        }
      }
    });

    if(response.ok) {
      return {
        status: "success",
        message: "Account fetched successfully",
        data: data
      }
    }
    
    if (response.status === 500) {
      throw new Error("Internal server error")
    }
    
    throw new Error("Failed to fetch account");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch account";
    
    return {
      status: "error",
      message: message
    } 
  }
}

export const getAccountOptions = async ({ name }: { name: string }) => { 
  try {
    const { response, data } = await accountingClient.GET("/options/account/", {
      params: {
        query: {
          name: name
        }
      }
    });
    if (response.ok && data) {
      return {
        status: "success",
        message: "Account options fetched successfully",
        data: data.items
      }
    }

    throw new Error("Failed to fetch account options");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "Failed to fetch account options";
    
    return {
      status: "error",
      message: message
    }
  }
}