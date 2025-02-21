
import ModuleHRPayrollCreateForm from "@/components/modules/hr/payrolls/create/form"
import ModuleHRPayrollDetailMenuActionBack from "@/components/modules/hr/payrolls/menu-action/action-back";
import MainModuleHeader from "@/components/modules/main/header";
import { Flex } from "@chakra-ui/react";

export const dynamic = "force-dynamic"

export default async function ModuleHRPayrollCreatePage() {


  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Payroll"
        withViewHelper={false}
        actions={<ModuleHRPayrollDetailMenuActionBack />}
      />

      <ModuleHRPayrollCreateForm/>
    </Flex>
  )
}