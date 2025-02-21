import { redirect } from "next/navigation";
import ModuleError from "@/components/modules/error";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import { getDepartment } from "@/app/actions/modules/hr/departments";
import { ModuleHRDepartmentDetailMenuAction } from "@/components/modules/hr/departments/menu-action";
import ModuleUAMGroupDetailHistory from "@/components/modules/uam/group/detail/history";
import ModuleHRDepartmentDetail from "@/components/modules/hr/departments/detail";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModulesHRDepartmentDetailPage({
  params,
}: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/uam/departments");
  }

  const { status, data, message } = await getDepartment({ pk });

  if (status === "error") {
    return <ModuleError message={message as string} />;
  }

  return (
    <Flex w={"full"} direction={"column"} p={5} gap={5} flex={1}>
      <MainModuleHeader
        title="Detail Department"
        actions={<ModuleHRDepartmentDetailMenuAction />}
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
            gap={5}
          >
            <ModuleHRDepartmentDetail data={data} />
          </Flex>
          <ModuleUAMGroupDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}
