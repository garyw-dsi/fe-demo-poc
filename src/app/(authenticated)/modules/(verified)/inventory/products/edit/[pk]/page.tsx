import { getAllAccounts } from "@/app/actions/modules/accounting/accounts";
import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";
import { getDetailProduct } from "@/app/actions/modules/inventory/products";
import { getAllProductsCategory } from "@/app/actions/modules/inventory/products-category";
import ModuleError from "@/components/modules/error";
import ModuleInventoryProductDetailHistory from "@/components/modules/inventory/products/detail/history";
import ModuleInventoryProductEditForm from "@/components/modules/inventory/products/edit/form";
import { ModuleInventoryProductDetailMenuAction } from "@/components/modules/inventory/products/menu-action";
import MainModuleHeader from "@/components/modules/main/header";
import { Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  }
}

interface Option {
  value: string;
  label: string;
};

async function fetchOptions() {
  const [currencyResponse, accountsResponse, categoryResponse] = await Promise.all([
    getAllCurrencyOption(),
    getAllAccounts({ page: 1, page_size: 20 }),
    getAllProductsCategory({ page: 1, page_size: 20 }),
  ]);

  const currencyOptions: Option[] = currencyResponse.data?.map((d) => ({
    value: d.pk.toString(),
    label: `${d.symbol} (${d.name})`,
  })) || [];

  const accountOptions: Option[] = accountsResponse.data?.items.map((d) => ({
    value: d.pk.toString(),
    label: d.name,
  })) || [];

  const categoryOptions: Option[] = categoryResponse.data?.items.map((d) => ({
    value: d.pk.toString(),
    label: d.name,
  })) || [];

  return { currencyOptions, accountOptions, categoryOptions };
}

export default async function ModuleInventoryProductEditPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/inventory")
  }

  const { status, data, message } = await getDetailProduct({ pk: pk });
  const { currencyOptions, accountOptions, categoryOptions } = await fetchOptions();

  if (status === "error") {
    return (
      <ModuleError message={message as string} />
    )
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
        title="Edit Product"
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
            maxW={{ base: 'full' }}
            gap={5}
          >
            <ModuleInventoryProductEditForm
              initialProduct={data}
              currency={currencyOptions}
              category={categoryOptions}
              initialAccounts={accountOptions}
            />
          </Flex>
          <ModuleInventoryProductDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}