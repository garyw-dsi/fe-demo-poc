import { getAllAccounts } from "@/app/actions/modules/accounting/accounts";
import { getProductCategory } from "@/app/actions/modules/inventory/products-category";
import ModuleError from "@/components/modules/error";
import ModuleInventoryProductCategoryDetailHistory from "@/components/modules/inventory/products-category/detail/history";
import ModuleInventoryProductCategoryEditForm from "@/components/modules/inventory/products-category/edit/form";
import { ModuleInventoryProductCategoryDetailMenuAction } from "@/components/modules/inventory/products-category/menu-action";
import MainModuleHeader from "@/components/modules/main/header";
import { Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleInventoryProductCategoryEditPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/inventory")
  }

  const { status, data, message } = await getProductCategory({ pk: pk });
  const { data: accounts } = await getAllAccounts({ page: 1, page_size: 20 });

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
        title="Edit Product Category"
        actions={<ModuleInventoryProductCategoryDetailMenuAction />}
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
            maxW={{ base: 'full' }}
            gap={5}
          >
            <ModuleInventoryProductCategoryEditForm
              initialAccounts={accounts?.items.map((account) => ({
                value: account.pk.toString(),
                label: account.name
              }))}
              initialData={data}
            />
          </Flex>
          <ModuleInventoryProductCategoryDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}