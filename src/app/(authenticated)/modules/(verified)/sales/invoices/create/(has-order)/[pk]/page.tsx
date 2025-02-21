import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { getOrder } from "@/app/actions/modules/sales/orders";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesInvoiceCreateForm from "@/components/modules/sales/invoices/create/form";
import ModuleSalesInvoiceMenuActionBack from "@/components/modules/sales/invoices/menu-action/action-back";
import { getAllVat } from "@/app/actions/modules/core/vat";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleSalesCreateOrderInvoicePage({
  params
}: PageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/sales/orders/create");
  }

  const { data, status, message } = await getOrder({ pk });
  const { data: vats } = await getAllVat({ page: 1, page_size: 20 });

  if (status === "error") {
    return <ModuleError message={message as string} />
  }

  if (data?.status === "Draft") {
    redirect(`/modules/sales/orders/detail/${pk}`);
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
        title="Create Invoice"
        withViewHelper={false}
        actions={<ModuleSalesInvoiceMenuActionBack />}
      />

      {data && (
        <ModuleSalesInvoiceCreateForm
          initialData={data}
          vats={vats?.items.map((data) => {
            return {
              value: data.pk.toString(),
              label: data.rate * 100 + "%",
              other: data
            }
          })}
        />
      )}
    </Flex>
  )
}