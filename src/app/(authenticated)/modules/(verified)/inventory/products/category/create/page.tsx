import { getAllAccounts } from "@/app/actions/modules/accounting/accounts";
import ModuleInventoryProductCategoryCreateForm from "@/components/modules/inventory/products-category/create/form";
import ModuleInventoryProductCategoryMenuActionBack from "@/components/modules/inventory/products-category/menu-action/action-back";
import MainModuleHeader from "@/components/modules/main/header";
import { Flex } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

export default async function ModuleInventoryProductCategoryCreatePage() {
  const { data } = await getAllAccounts({ page: 1, page_size: 20 });
  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Product Category"
        withViewHelper={false}
        actions={<ModuleInventoryProductCategoryMenuActionBack />}
      />

      <ModuleInventoryProductCategoryCreateForm
        initialAccounts={data?.items.map((account) => {
          return {
            value: account.pk.toString(),
            label: account.name
          }
        })}
      />
    </Flex>
  )
}