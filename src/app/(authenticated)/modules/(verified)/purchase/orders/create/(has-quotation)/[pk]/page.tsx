import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";
import { getQuotationForOrder } from "@/app/actions/modules/purchase/orders";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModulePurchaseOrderMenuActionBack from "@/components/modules/purchase/orders/menu-action/action-back";
import ModulePurchaseOrderCreateForm from "@/components/modules/purchase/orders/create/form";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModulePurchaseCreateQuotationOrderPage({
  params
}: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/purchase/orders/create");
  }

  const { data, status, message } = await getQuotationForOrder({ quotationId: pk });
  const { data: currency } = await getAllCurrencyOption();


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
        title="Create Purchase Order"
        withViewHelper={false}
        actions={<ModulePurchaseOrderMenuActionBack />}
      />

      <ModulePurchaseOrderCreateForm
        initialData={data}
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