import MainModuleHeader from "@/components/modules/main/header";
import { ModuleUAMUserDetailMenuAction } from "@/components/modules/uam/user/menu-action";
import { Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { getDetailUser } from "@/app/actions/modules/uam/users";
import ModuleError from "@/components/modules/error";
import ModuleUAMUserDetailHistory from "@/components/modules/uam/user/detail/history";
import ModuleUAMUserEditForm from "@/components/modules/uam/user/edit/form";
import { getAllGroups } from "@/app/actions/modules/uam/groups";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleUAMUserEditPage({ params }: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/uam")
  }

  const { status, data, message } = await getDetailUser({ pk: pk });
  const { data: groups } = await getAllGroups({ page: 1, page_size: 10 });

  if (status === "error") {
    return (
      <ModuleError message={message as string} />
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
        title="Edit User"
        actions={<ModuleUAMUserDetailMenuAction />}
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
            <ModuleUAMUserEditForm
              data={data}
              initialGroups={groups?.items.map((item) => {
                return {
                  value: item.pk.toString(),
                  label: item.name
                }
              })}
            />
          </Flex>
          <ModuleUAMUserDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}