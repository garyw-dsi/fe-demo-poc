import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { getInvoice } from "@/app/actions/modules/sales/invoices";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModulePurchaseInvoiceDetailHistory from "@/components/modules/purchase/invoices/detail/history";
import ModulePurchaseInvoiceItems from "@/components/modules/purchase/invoices/detail/invoice-items";
import ModulePurchaseInvoiceOrderDetail from "@/components/modules/purchase/invoices/detail/invoice-order";
import ModulePurchaseInvoiceQuotationDetail from "@/components/modules/purchase/invoices/detail/invoice-quotation";
import ModulePurchaseInvoiceDetailTabs from "@/components/modules/purchase/invoices/detail/tab";
import { ModulePurchaseInvoicesDetailMenuAction } from "@/components/modules/purchase/invoices/menu-action";

export const dynamic = "force-dynamic";

interface pageProps {
  params: {
    pk: string
  }
}

export default async function ModulePurchaseInvoicesReadDetailPage({
  params
}: pageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/purchase/invoices");
  }

  const { data, status, message } = await getInvoice({ pk });

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
        title="Detail Invoice"
        actions={<ModulePurchaseInvoicesDetailMenuAction />}
        withViewHelper={false}
      />

      {data && (
        <Flex
          flex={1}
          justify={"space-between"}
          direction={{ base: "column", lg: "row" }}
          flexWrap={'wrap'}
          gap={10}
        >
          <Flex
            direction={"column"}
            flex={1}
            maxW={{ base: 'full', lg: "55vw" }}
            gap={5}
          >
            <ModulePurchaseInvoiceDetailTabs
              order={<ModulePurchaseInvoiceOrderDetail order={data.invoice.order} />}
              quotation={<ModulePurchaseInvoiceQuotationDetail quotation={data.invoice.order?.quotation} />}
            />
            <ModulePurchaseInvoiceItems items={data.items} />
          </Flex>
          <ModulePurchaseInvoiceDetailHistory history={data.invoice} />
        </Flex>
      )}
    </Flex>
  )
}