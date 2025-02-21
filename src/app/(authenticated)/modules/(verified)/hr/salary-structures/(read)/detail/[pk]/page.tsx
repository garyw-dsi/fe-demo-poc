import { redirect } from "next/navigation";
import ModuleError from "@/components/modules/error";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import { ModuleHRSalaryStructureDetailMenuAction } from "@/components/modules/hr/salary-structures/menu-action";
import { getSalaryStructure } from "@/app/actions/modules/hr/salary-structures";
import ModuleHRSalaryStructureDetailHistory from "@/components/modules/hr/salary-structures/detail/history";
import ModuleHRSalaryStructureDepartmentInformation from "@/components/modules/hr/salary-structures/detail/department-information";
import ModuleHRSalaryStructureInformation from "@/components/modules/hr/salary-structures/detail/salary-information";
import ModuleHRSalaryStructureDetailTabs from "@/components/modules/hr/salary-structures/detail/tab";
import ModuleHRSalaryStructureAllowancesInformation from "@/components/modules/hr/salary-structures/detail/allowances-information";
import ModuleHRSalaryStructureDeductionsInformation from "@/components/modules/hr/salary-structures/detail/deductions-information";
import ModuleHRSalaryStructureTotalInformation from "@/components/modules/hr/salary-structures/detail/salary-total";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModuleHRSalaryStructureDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/hr/salary-structures")
  }

  const { status, data, message } = await getSalaryStructure({ pk: pk });

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
        title="Detail Salary Structure"
        actions={<ModuleHRSalaryStructureDetailMenuAction />}
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
            <ModuleHRSalaryStructureDepartmentInformation data={data} />
            <ModuleHRSalaryStructureInformation data={data} />
            <ModuleHRSalaryStructureDetailTabs
              allowances={<ModuleHRSalaryStructureAllowancesInformation data={data} />}
              deductions={<ModuleHRSalaryStructureDeductionsInformation data={data} />}
            />
            <ModuleHRSalaryStructureTotalInformation data={data} />
          </Flex>
          <ModuleHRSalaryStructureDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}