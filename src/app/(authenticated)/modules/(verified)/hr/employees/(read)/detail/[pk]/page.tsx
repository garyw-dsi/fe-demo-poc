import { redirect } from "next/navigation";
import ModuleError from "@/components/modules/error";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import { getEmployee } from "@/app/actions/modules/hr/employees";
import { ModuleHREmployeeDetailMenuAction } from "@/components/modules/hr/employees/menu-action";
import ModuleHREmployeeDetailHistory from "@/components/modules/hr/employees/detail/history";
import ModuleHREmployeeDetail from "@/components/modules/hr/employees/detail";
import ModuleHREmployeeDetailTabs from "@/components/modules/hr/employees/detail/tab";
import ModuleHREmployeeContactInformation from "@/components/modules/hr/employees/detail/contact-information";
import ModuleHREmployeeAccountingInformation from "@/components/modules/hr/employees/detail/account-information";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModuleHREmployeeDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/hr/employees")
  }

  const { status, data, message } = await getEmployee({ pk: pk });

  if (status === "error") {
    return <ModuleError message={message as string} />
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
        title="Detail Employee"
        actions={<ModuleHREmployeeDetailMenuAction />}
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
            <ModuleHREmployeeDetail data={data.employee} />
            <ModuleHREmployeeDetailTabs
              salary={<ModuleHREmployeeAccountingInformation accounting={data.accounting} />}
              contact={<ModuleHREmployeeContactInformation contact={data.contact} />}
            />
          </Flex>
          <ModuleHREmployeeDetailHistory history={data.employee} />
        </Flex>
      )}
    </Flex>
  )
}