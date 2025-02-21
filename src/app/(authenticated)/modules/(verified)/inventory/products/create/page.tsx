import { getAllAccounts } from "@/app/actions/modules/accounting/accounts";
import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";
import { getAllProductsCategory } from "@/app/actions/modules/inventory/products-category";
import ModuleInventoryProductCreateForm from "@/components/modules/inventory/products/create/form";
import ModuleInventoryProductMenuActionBack from "@/components/modules/inventory/products/menu-action/action-back";
import MainModuleHeader from "@/components/modules/main/header";
import { Flex } from "@chakra-ui/react";

export const dynamic = "force-dynamic";

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

export default async function CreateProductPage() {
  const { currencyOptions, accountOptions, categoryOptions } = await fetchOptions();

  return (
    <Flex w="full" direction="column" p={5} gap={5} flex={1}>
      <MainModuleHeader
        title="Create Product"
        withViewHelper={false}
        actions={<ModuleInventoryProductMenuActionBack />}
      />
      <ModuleInventoryProductCreateForm
        initialAccounts={accountOptions}
        currency={currencyOptions}
        category={categoryOptions}
      />
    </Flex>
  );
}