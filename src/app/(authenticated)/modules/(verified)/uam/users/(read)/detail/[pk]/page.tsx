import { redirect } from "next/navigation";
import { getDetailUser } from "@/app/actions/modules/uam/users";
import ModuleError from "@/components/modules/error";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import { ModuleUAMUserDetailMenuAction } from "@/components/modules/uam/user/menu-action";
import ModuleUAMUserDetail from "@/components/modules/uam/user/detail";
import ModuleUAMUserDetailHistory from "@/components/modules/uam/user/detail/history";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModuleUAMUserDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/uam")
  }

  const { status, data, message } = await getDetailUser({ pk: pk });

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
        title="Detail User"
        actions={<ModuleUAMUserDetailMenuAction />}
        withViewHelper={false}
      />
      {data && (
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
            maxW={{ base: 'full', md: "md" }}
            gap={5}
          >
            <ModuleUAMUserDetail data={data} />
          </Flex>
          <ModuleUAMUserDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}