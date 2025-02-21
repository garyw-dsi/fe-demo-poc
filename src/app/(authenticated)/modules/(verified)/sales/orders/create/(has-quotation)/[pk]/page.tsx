import { getAllCurrencyOption } from "@/app/actions/modules/core/currency";
import { getAllVat } from "@/app/actions/modules/core/vat";
import { getQuotations } from "@/app/actions/modules/sales/quotations";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesOrderCreateForm from "@/components/modules/sales/orders/create/form";
import ModuleSalesOrderMenuActionBack from "@/components/modules/sales/orders/menu-action/action-back";
import { Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleSalesCreateQuotationOrderPage({
  params
}: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/sales/orders/create");
  }

  const { data, status, message } = await getQuotations({ pk });

  if (status === "error") {
    return <ModuleError message={message as string} />
  }

  if (data?.status !== "Issued") {
    redirect(`/modules/sales/quotation/detail/${pk}`);
  }

  const { data: currency } = await getAllCurrencyOption();
  const { data: vats } = await getAllVat({ page: 1, page_size: 20 });

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Create Order"
        withViewHelper={false}
        actions={<ModuleSalesOrderMenuActionBack />}
      />

      <ModuleSalesOrderCreateForm
        initialData={data}
        currency={currency?.map((data) => {
          return {
            value: data.pk.toString(),
            label: `${data.symbol} (${data.name})`
          }
        })}
        vats={vats?.items.map((data) => {
          return {
            value: data.pk.toString(),
            label: data.rate * 100 + "%",
            other: data
          }
        })}
      />
    </Flex>
  )
}