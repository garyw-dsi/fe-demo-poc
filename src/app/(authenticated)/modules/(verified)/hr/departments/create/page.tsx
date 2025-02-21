import { Flex } from "@chakra-ui/react"
import { getAllDepartments } from "@/app/actions/modules/hr/departments"
import ModuleHRDepartmentCreateForm from "@/components/modules/hr/departments/create/form"
import ModuleHRDepartmentDetailMenuActionBack from "@/components/modules/hr/departments/menu-action/action-back"
import MainModuleHeader from "@/components/modules/main/header"

export const dynamic = 'force-dynamic'

export default async function ModuleHRDepartmentCreatePage() {
  const { data } = await getAllDepartments({ page: 1, page_size: 20 });
  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Department"
        actions={<ModuleHRDepartmentDetailMenuActionBack />}
        withViewHelper={false}
      />
      <ModuleHRDepartmentCreateForm
        initialDepartment={data?.items.map((department) => {
          return {
            label: department.name,
            value: department.pk.toString()
          }
        })}
      />
    </Flex>
  )
}