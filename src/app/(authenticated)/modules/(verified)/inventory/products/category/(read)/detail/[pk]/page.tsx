import { redirect } from "next/navigation";
import ModuleError from "@/components/modules/error";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import { getProductCategory } from "@/app/actions/modules/inventory/products-category";
import { ModuleInventoryProductCategoryDetailMenuAction } from "@/components/modules/inventory/products-category/menu-action";
import ModuleInventoryProductCategoryDetailHistory from "@/components/modules/inventory/products-category/detail/history";
import ModuleInventoryProductCategoryDetail from "@/components/modules/inventory/products-category/detail";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModuleInventoryProductCategoryDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/inventory")
  }

  const { status, data, message } = await getProductCategory({ pk: pk });

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
        title="Detail Product Category"
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
            maxW={{ base: 'full', md: "md" }}
            gap={5}
          >
            <ModuleInventoryProductCategoryDetail data={data} />
          </Flex>
          <ModuleInventoryProductCategoryDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}