import { Flex } from "@chakra-ui/react";
import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";

import MainModuleHeader from "@/components/modules/main/header";
import ModulePurchaseOrderMenuActionBack from "@/components/modules/purchase/orders/menu-action/action-back";
import ModulePurchaseOrderCreateForm from "@/components/modules/purchase/orders/create/form";

export const dynamic = "force-dynamic";

export default async function ModulePurchaseOrderCreatePage() {
  const { data: currency } = await getAllCurrencyOption();

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Purchase Order"
        withViewHelper={false}
        actions={<ModulePurchaseOrderMenuActionBack />}
      />

      <ModulePurchaseOrderCreateForm
        currency={currency?.map((d) => {
          return {
            value: d.pk.toString(),
            label: `${d.symbol} (${d.name})`
          }
        })}
      />
    </Flex>
  )
}