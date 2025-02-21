import { redirect } from "next/navigation";
import { getAllGroups, getGroupDetail } from "@/app/actions/modules/uam/groups";
import ModuleError from "@/components/modules/error";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import { ModuleUAMGroupDetailMenuAction } from "@/components/modules/uam/group/menu-action";
import ModuleUAMGroupDetailHistory from "@/components/modules/uam/group/detail/history";
import ModuleUAMGroupEditForm from "@/components/modules/uam/group/edit/form";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModulesUAMGroupEditPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/uam/groups")
  }

  const { data, status, message } = await getGroupDetail({ pk: pk });
  const { data: groups } = await getAllGroups({ page: 1, page_size: 10 });

  if (!data) {
    redirect("/modules/uam/groups")
  }

  if (
    status === "error"
  ) {
    return (
      <ModuleError message={message || ""} />
    )
  }

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Edit Group"
        actions={
          <ModuleUAMGroupDetailMenuAction />
        }
        withViewHelper={false}
      />

      {data && (
        <Flex
          flex={1}
          justify={"space-between"}
          direction={{ base: "column", xl: "row" }}
          flexWrap={{ base: "wrap", xl: "nowrap" }}
          gap={10}
        >
          <Flex
            direction={"column"}
            w={{ base: 'full' }}
            maxW={{ base: 'full' }}
            gap={5}
          >
            <ModuleUAMGroupEditForm
              data={data}
              pk={pk}
              initialGroups={groups?.items.map((item) => {
                return {
                  value: item.pk.toString(),
                  label: item.name
                }
              })}
            />
          </Flex>
          <ModuleUAMGroupDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}