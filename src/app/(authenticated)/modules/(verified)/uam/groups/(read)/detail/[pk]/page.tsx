import { redirect } from "next/navigation";
import { getGroupDetail, getPermissionByGroupId } from "@/app/actions/modules/uam/groups";
import ModuleError from "@/components/modules/error";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import { ModuleUAMGroupDetailMenuAction } from "@/components/modules/uam/group/menu-action";
import ModuleUAMGroupDetail from "@/components/modules/uam/group/detail";
import ModuleUAMGroupDetailHistory from "@/components/modules/uam/group/detail/history";
import ModuleUAMGroupPermissionInformation from "@/components/modules/uam/group/detail/permissions";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModulesUAMGroupDetailPage({
  params,
}: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/uam/groups");
  }

  try {
    const [groupDetail, permission] = await Promise.all([
      getGroupDetail({ pk }),
      getPermissionByGroupId({ pk }),
    ]);

    if (
      groupDetail.status === "error" ||
      permission.status === "error"
    ) {
      const message = groupDetail.message || permission.message;
      return <ModuleError message={message as string} />;
    }

    if (
      groupDetail.data &&
      permission.data
    ) {
      return (
        <Flex w={"full"} direction={"column"} p={5} gap={5} flex={1}>
          <MainModuleHeader
            title="Detail Group"
            actions={<ModuleUAMGroupDetailMenuAction />}
            withViewHelper={false}
          />
          <Flex
            flex={1}
            justify={"space-between"}
            direction={{ base: "column", md: "row" }}
            flexWrap={'wrap'}
            gap={10}
          >
            <Flex
              direction={"column"}
              flex={1}
              gap={5}
            >
              <ModuleUAMGroupDetail data={groupDetail.data} />
              <ModuleUAMGroupPermissionInformation permissions={permission.data.permissions || []} />
            </Flex>
            <ModuleUAMGroupDetailHistory history={groupDetail.data} />
          </Flex>
        </Flex>
      )
    }
  } catch {
    return <ModuleError message="An unexpected error occurred." />
  }
}
