"use server"

import { uamClient } from "@/libs/api/services/uam";

const getUserOrganization = async () => {
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

export const getMyOrganization = async () => {
  const userOrganization = await getUserOrganization();

  if (!userOrganization?.group?.organization) {
    console.log("User organization or organization_id not found.");

    return null;
  }

  try {
    const { group } = userOrganization;
    const organization_id = group.organization.pk;

    const { response,data } = await uamClient.GET("/organization/{organization_id}/", {
      params: {
        path: {
          organization_id: organization_id
        }
      }
    });

    if (response.status === 200) {
      return data;
    }

    console.log("Failed to fetch organization. Status:", response.status);
    return null;
  } catch(error) {
    console.error("Error fetching organization:", error);
    return null;
  }
}