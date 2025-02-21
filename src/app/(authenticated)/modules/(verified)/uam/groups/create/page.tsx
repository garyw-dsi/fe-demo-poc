import { getAllGroups } from "@/app/actions/modules/uam/groups";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleUAMGroupCreateForm from "@/components/modules/uam/group/create/form";
import ModuleUAMGroupDetailMenuActionBack from "@/components/modules/uam/group/menu-action/action-back";
import { Flex } from "@chakra-ui/react";

export const dynamic = 'force-dynamic';

export default async function ModuleUAMGroupCreatePage() {
  const { data } = await getAllGroups({ page: 1, page_size: 10 });

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Group"
        actions={<ModuleUAMGroupDetailMenuActionBack />}
        withViewHelper={false}
      />

      <ModuleUAMGroupCreateForm
        initialGroups={data?.items.map((item) => {
          return {
            value: item.pk.toString(),
            label: item.name
          }
        })}
      />
    </Flex>
  )
}