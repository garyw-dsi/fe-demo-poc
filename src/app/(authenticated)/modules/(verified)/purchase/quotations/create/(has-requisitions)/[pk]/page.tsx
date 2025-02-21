import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";
import { getQuotationForOrder } from "@/app/actions/modules/purchase/orders";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModulePurchaseQuotationCreateForm from "@/components/modules/purchase/quotations/create/form";
import ModulePurchaseQuotationMenuActionBack from "@/components/modules/purchase/quotations/menu-action/action-back";

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
    redirect("/modules/purchase/requisitions/create");
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
        title="Create Quotation"
        withViewHelper={false}
        actions={<ModulePurchaseQuotationMenuActionBack />}
      />

      <ModulePurchaseQuotationCreateForm
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