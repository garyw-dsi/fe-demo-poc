import { redirect } from "next/navigation";
import ModuleError from "@/components/modules/error";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import { getPayroll } from "@/app/actions/modules/hr/payrolls";
import { ModuleHRPayrollDetailMenuAction } from "@/components/modules/hr/payrolls/menu-action";
import ModuleHRPayrollDetailHistory from "@/components/modules/hr/payrolls/detail/history";
import ModuleHRPayrollBatchStatus from "@/components/modules/hr/payrolls/payroll-status";
import ModuleHRPayrollBatchInformation from "@/components/modules/hr/payrolls/detail/batch-information";
import ModuleHRPayrollEmployeeInformation from "@/components/modules/hr/payrolls/detail/employee-information";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModuleHRPayrollDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/hr/payrolls")
  }

  const { status, data, message } = await getPayroll({ pk: pk });

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
        title="Detail Payroll"
        actions={<ModuleHRPayrollDetailMenuAction />}
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
            <ModuleHRPayrollBatchStatus data={data} userCanUpdate={true} />
            <ModuleHRPayrollBatchInformation data={data} />
            <ModuleHRPayrollEmployeeInformation data={data} />
          </Flex>
          <ModuleHRPayrollDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}