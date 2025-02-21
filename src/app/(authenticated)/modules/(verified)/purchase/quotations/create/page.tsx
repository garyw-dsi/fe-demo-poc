import { Flex } from "@chakra-ui/react";
import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";

import MainModuleHeader from "@/components/modules/main/header";
import ModulePurchaseQuotationMenuActionBack from "@/components/modules/purchase/quotations/menu-action/action-back";
import ModulePurchaseQuotationCreateForm from "@/components/modules/purchase/quotations/create/form";

export const dynamic = 'force-dynamic';

export default async function ModulePurchaseQuotationCreatePage() {
  const { data } = await getAllCurrencyOption();

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Quotation"
        withViewHelper={false}
        actions={<ModulePurchaseQuotationMenuActionBack />}
      />
      <ModulePurchaseQuotationCreateForm
        currency={data?.map((d) => {
          return {
            value: d.pk.toString(),
            label: `${d.symbol} (${d.name})`
          }
        })}
      />
    </Flex>
  )
}