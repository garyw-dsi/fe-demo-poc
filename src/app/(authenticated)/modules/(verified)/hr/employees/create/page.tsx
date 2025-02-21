import { getAllDepartments } from "@/app/actions/modules/hr/departments";
import { getAllSalaryStructures } from "@/app/actions/modules/hr/salary-structures";
import ModuleHREmployeeCreateForm from "@/components/modules/hr/employees/create/form";
import ModuleHREmployeeDetailMenuActionBack from "@/components/modules/hr/employees/menu-action/action-back";
import MainModuleHeader from "@/components/modules/main/header";
import { Flex } from "@chakra-ui/react";

export const dynamic = 'force-dynamic';

export default async function ModuleUAMUserCreatePage() {
  const { data } = await getAllDepartments({ page: 1, page_size: 10 });
  const { data: salaryStructures } = await getAllSalaryStructures({ page: 1, page_size: 20 });

  const [initialGroups, initialAccounts] = [
    data?.items.map((item) => {
      return {
        value: item.pk.toString(),
        label: item.name
      }
    }),
    salaryStructures?.items.map((item) => {
      return {
        value: item.pk.toString(),
        label: item.name
      }
    })
  ]

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Employee"
        withViewHelper={false}
        actions={<ModuleHREmployeeDetailMenuActionBack />}
      />

      <ModuleHREmployeeCreateForm
        initialGroups={initialGroups}
        initialSalaryStructures={initialAccounts}
      />
    </Flex>
  )
}