import { getAllCurrency } from "@/app/actions/modules/core/currency"
import { getAllDepartments } from "@/app/actions/modules/hr/departments"
import ModuleHRSalaryStructureCreateForm from "@/components/modules/hr/salary-structures/create/form"
import ModuleHRSalaryStructureDetailMenuActionBack from "@/components/modules/hr/salary-structures/menu-action/action-back"
import MainModuleHeader from "@/components/modules/main/header"
import { Flex } from "@chakra-ui/react"

export const dynamic = "force-dynamic"

export default async function ModuleHRSalaryStructureCreatePage() {
  const { data: departments } = await getAllDepartments({ page: 1, page_size: 20 });
  const { data: currencies } = await getAllCurrency({ page: 1, page_size: 20 });

  const initialDepartment = departments?.items.map((department) => {
    return {
      value: department.pk.toString(),
      label: department.name
    }
  });

  const initialCurrency = currencies?.items.map((currency) => {
    return {
      value: currency.pk.toString(),
      label: `${currency.name} (${currency.symbol})`
    }
  });

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Salary Structure"
        withViewHelper={false}
        actions={<ModuleHRSalaryStructureDetailMenuActionBack />}
      />

      <ModuleHRSalaryStructureCreateForm
        initialDepartment={initialDepartment}
        initialCurrency={initialCurrency}
      />
    </Flex>
  )
}