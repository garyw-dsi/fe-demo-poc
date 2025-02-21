import { Flex } from "@chakra-ui/react";
import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";

import MainModuleHeader from "@/components/modules/main/header";
import ModulePurchaseRequisitionMenuActionBack from "@/components/modules/purchase/requisitions/menu-action/action-back";
import ModulePurchaseRequisitionCreateForm from "@/components/modules/purchase/requisitions/create/form";

export const dynamic = 'force-dynamic';

export default async function ModulePurchaseRequisitionCreatePage() {
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
        title="Create Requisition"
        withViewHelper={false}
        actions={<ModulePurchaseRequisitionMenuActionBack />}
      />
      <ModulePurchaseRequisitionCreateForm
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