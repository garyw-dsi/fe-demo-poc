"use server"

import { uamClient } from "@/libs/api/services/uam";

interface GetAllGroupParams { 
  page: number;
  page_size: number;
  name?: string;
}

export const getAllGroups = async ({
  page,
  page_size,
  name
}: GetAllGroupParams) => {
  try {
    const { response, data } = await uamClient.GET("/group/", {
      params: {
        query: {
          page: page,
          page_size: page_size,
          name__icontains: name
        }
      }
    });

    if (response.status === 200 && data) {
      return {
        status: "success",
        data: data
      }
    }

    throw new Error("Error while fetching groups");

  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "You need to verified your email first to access this page";

    return {
      status: "error",
      message
    }
  }
}

export const getGroupDetail = async ({ pk }: { pk: number }) => {
  try {
    const { response, data } = await uamClient.GET("/group/{group_id}/", {
      params: {
        path: {
          group_id: pk
        }
      }
    });

    if (response.status === 200 && data) {
      return {
        status: "success",
        data: data
      }
    }

    if (response.status === 404) {
      throw new Error("Group not found");
    }

    if (response.status === 500) { 
      throw new Error("Internal server error");
    }

    throw new Error("Error while fetching group detail");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "You need to verified your email first to access this page";
    
    return {
      status: "error",
      message
    }
  }
}

export const getPermissionByGroupId = async ({ pk }: { pk: number }) => { 
  try {
    const { response, data } = await uamClient.GET("/group/{group_id}/permissions/", {
      params: {
        path: {
          group_id: pk
        }
      }
    });

    if (response.status === 200 && data) {
      return {
        status: "success",
        data: data
      }
    }

    if (response.status === 404) {
      throw new Error("Group not found");
    }

    if (response.status === 500) { 
      throw new Error("Internal server error");
    }

    throw new Error("Error while fetching group permissions");
  } catch (error) {
    const message = error instanceof Error
      ? error.message
      : "You need to verified your email first to access this page";

    return {
      status: "error",
      message
    }
  }
}

export const getGroupOptions = async ({ name }: {name:string}) => { 
  try {
    const { response, data } = await uamClient.GET("/group/", {
      params: {
        query: {
          name__icontains: name
        }
      }
    });

    if (response.status === 200 && data) {
      return {
        status: "success",
        data: data.items
      }
    }

    return {
      status: "error",
      data: null,
      message: "Error while fetching group options"
    }
  } catch (error) {
    console.log("Get group options error:", error);
    return {
      status: "error",
      data: null,
      message: "Error while fetching group options"
    }
  }
}