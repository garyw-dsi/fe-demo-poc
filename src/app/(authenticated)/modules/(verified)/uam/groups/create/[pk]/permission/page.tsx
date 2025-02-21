import { redirect } from "next/navigation";
import { getPermissionList } from "@/app/actions/modules/uam/groups/permission";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import { ModuleUAMGroupDetailMenuAction } from "@/components/modules/uam/group/menu-action";
import ModuleError from "@/components/modules/error";
import { getGroupDetail, getPermissionByGroupId } from "@/app/actions/modules/uam/groups";
import ModuleUAMGroupDetail from "@/components/modules/uam/group/detail";
import ModuleUAMGroupSetPermission from "@/components/modules/uam/group/permission/set-permission";

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModulesUAMGroupSetPermissionPage({
  params,
}: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/uam/groups");
  }

  try {
    const [permissions, groupDetail, permission] = await Promise.all([
      getPermissionList(),
      getGroupDetail({ pk }),
      getPermissionByGroupId({ pk }),
    ]);

    console.log(permission.data?.permissions)
    if (
      !groupDetail.data ||
      groupDetail.status === "error" ||
      permission.status === "error"
    ) {
      const message = groupDetail.message || permission.message;

      return <ModuleError message={message as string} />
    }

    if (
      groupDetail.data &&
      permission.data
    ) {
      return (
        <Flex w={"full"} direction={"column"} p={5} gap={5} flex={1}>
          <MainModuleHeader
            title="Set Group Permissions"
            actions={<ModuleUAMGroupDetailMenuAction />}
            withViewHelper={false}
          />
          <Flex flex={1} gap={12} justify={"space-between"}>
            <Flex direction={"column"} flex={1} maxW={"full"} gap={5}>
              <ModuleUAMGroupDetail data={groupDetail.data} />
              <ModuleUAMGroupSetPermission
                permissions={permissions.data || []}
                initialPermissions={permission.data.permissions || []}
              />
            </Flex>
          </Flex>
        </Flex>
      )
    }
  } catch {
    return <ModuleError message="An unexpected error occurred." />;
  }
}
