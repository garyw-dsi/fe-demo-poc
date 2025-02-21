"use server"

import { uamClient } from "@/libs/api/services/uam"

export const getProfile = async () => {
  try {
    const { response, data } = await uamClient.GET("/auth/profile/");

    if (response.status === 200) {
      return data
    }

    console.log(response, data)
    
    return null
  } catch (error) {
    console.error(error)
    return null;
  }
}

const getOrganizationDetail = async ({ organizationId }: { organizationId: number | undefined }) => {
  try {
    if (!organizationId) {
      return null;
    }

    const { response, data } = await uamClient.GET("/organization/{organization_id}/", {
      params: {
        path: {
          organization_id: Number(organizationId)
        }
      }
    });

    if (response.ok) {
      return data;
    }

    return null;
  } catch  {
    return null;
  }
}

const getGroupPermission = async ({ groupId }: { groupId: number | undefined }) => { 
  try {
    if (!groupId) {
      return null
    }

    const { response, data } = await uamClient.GET("/group/{group_id}/permissions/", {
      params: {
        path: {
          group_id: Number(groupId)
        }
      },
      next: {
        tags: ["group_permissions"]
      }
    });

    if (response.ok) {
      return data;
    }
    return null;
  } catch {
    return null
  }
}

export const getDetailUserProfile = async () => {
  try {
    const { response, data } = await uamClient.GET("/auth/profile/");

    if (
      response.ok &&
      data
    ) {
      const organizationId = data.group?.organization.pk;
      const groupId = data.group?.pk;

      const [organization, group] = await Promise.all([
        getOrganizationDetail({ organizationId}),
        getGroupPermission({ groupId })
      ]);

      const newData = {
        user: data,
        group: {
          name: data.group?.name,
          permissions: group?.permissions
        },
        organization: organization
      }

      return {
        status: "success",
        message: "User profile fetched successfully",
        data: newData
      }
    }

    return {
      status: "error",
      message: "Failed to get user profile"
    }
  } catch {
    return {
      status: "error",
      message: "Failed to get user profile"
    }
  }
}