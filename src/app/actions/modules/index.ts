"use server"

import { ModuleAction } from "@/constants";
import { uamClient } from "@/libs/api/services/uam";

export const checkIfNewUser = async () => {
  try {
    const { response, data } = await uamClient.GET("/auth/profile/", {
      next: {
        tags: ["new-user"]
      }
    });
    
    if (
      response.status === 200 &&
      data
    ) {
      if (data.group !== null) {
        return false;
      }
      
      return true;
    }
  
    return false
  } catch {
    return false
  }
}

const getUserGroups = async () => {
  try {
    const { response, data } = await uamClient.GET("/auth/profile/");
    
    if (response.status === 200) {
      return data;
    }

    console.log("Failed to fetch user groups. Status:", response.status);
    return null;
  } catch (error) {
    console.error("Error fetching user groups:", error);
    return null;
  }
}

export const checkUserPermission = async () => {
  const userGroup = await getUserGroups();

  if (!userGroup?.group?.pk) {
    console.log("User group or group_id not found.");
    return null;
  }

  try {
    const { response, data } = await uamClient.GET("/group/{group_id}/permissions/", {
      params: {
        path: {
          group_id: userGroup.group.pk
        }
      }
    });

    if (response.status === 200 && data) {
      return data.permissions;
    }

    console.log("Failed to fetch permissions. Status:", response.status);
    return null;
  } catch (error) {
    console.error("Check user permission error:", error); 
    return null;
  }
}

export const checkUserAction = async ({ action }: { action: ModuleAction }) => { 
  try {
    const { response } = await uamClient.GET("/auth/permission_check/", {
      params: {
        query: {
          actions: action
        }
      }
    });

    if (response.ok) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}