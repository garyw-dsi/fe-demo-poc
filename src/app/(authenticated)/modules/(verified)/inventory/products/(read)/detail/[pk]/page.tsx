import { redirect } from "next/navigation";
import ModuleError from "@/components/modules/error";
import { Flex } from "@chakra-ui/react";
import MainModuleHeader from "@/components/modules/main/header";
import { getDetailProduct } from "@/app/actions/modules/inventory/products";
import ModuleInventoryProductDetail from "@/components/modules/inventory/products/detail";
import ModuleInventoryProductDetailHistory from "@/components/modules/inventory/products/detail/history";
import { ModuleInventoryProductDetailMenuAction } from "@/components/modules/inventory/products/menu-action";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModuleInventoryProductDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/inventory")
  }

  const { status, data, message } = await getDetailProduct({ pk: pk });

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
        title="Detail Product"
        actions={<ModuleInventoryProductDetailMenuAction />}
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
            <ModuleInventoryProductDetail data={data} />
          </Flex>
          <ModuleInventoryProductDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}