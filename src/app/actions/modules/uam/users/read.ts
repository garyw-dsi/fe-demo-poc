"use server"

import { uamClient } from "@/libs/api/services/uam";


interface GetAllUsersParams { 
  page: number;
  page_size: number;
  email?: string;
  first_name?: string;
  last_name?: string;
  is_superuser?: boolean;
  is_active?: boolean;
  group_id?: boolean;
}

export const getAllUsers = async ({
  page,
  page_size,
  email,
  first_name,
  last_name,
  is_superuser,
  // is_active,
  group_id
}: GetAllUsersParams) => {
  try {
    const { response, data } = await uamClient.GET("/user/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          
          /**
           * contains search for email, first_name, and last_name
           */
          email__icontains: email,
          first_name__icontains: first_name,
          last_name__icontains: last_name,

          is_superuser: is_superuser,
          // is_active: is_active,
          group_id: group_id
        }
      }
    });

    if(response.status === 200 && data) {
      return {
        status: "success",
        data: data
      }
    }

    return {
      status: "error",
      data: null,
      message: "Error while fetching data"
    }
  } catch (error) {
    console.log("Get all users error:", error);
    return {
      status: "error",
      data: null,
      message: "You need to verified your email first to access this page"
    }
  }
}

export const getDetailUser = async ({ pk }: { pk: number }) => { 
  try {
    const { response, data } = await uamClient.GET("/user/{user_id}/", {
      params: {
        path: {
          user_id: pk
        }
      }
    });

    if(response.status === 200) {
      return {
        status: "success",
        data: data
      }
    }

    return {
      status: "error",
      message: "Failed to get user detail"
    }
  } catch (error) {
    console.error(error)
    return {
      status: "error",
      message: "Failed to get user detail"
    }
  }
}

export const getUserOptionsByEmail = async ({
  email
}: { email: string }) => { 
  try {
    const { response, data } = await uamClient.GET("/options/user/", {
      params: {
        query: {
          email__icontains: email
        }
      }
    });

    if (response.status === 200) {
      return data?.items || [];
    }

    return [];
  } catch (error) {
    console.log(error)
    return [];
  }
}