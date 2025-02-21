import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleContactDataDetail from "@/components/modules/core/contacts/detail/contact-data";
import ModuleContactDetailAction from "@/components/modules/core/contacts/detail/detail-action";
import { Aging } from "@/components/modules/accounting/customers/detail/type.static";
import { getVendorAccounting } from "@/app/actions/modules/accounting/vendors";
import { ModuleAccountingVendorsDetailMenuAction } from "@/components/modules/accounting/vendors/menu-action";
import ModuleAccountingVendorDetailTabs from "@/components/modules/accounting/vendors/detail/tab";
import ModuleAccountingVendorInvoiceDetail from "@/components/modules/accounting/vendors/detail/invoice-detail";
import ModuleAccountingVendorAgingDetail from "@/components/modules/accounting/vendors/detail/ar-aging";
import ModuleAccountingVendorPaymentDetail from "@/components/modules/accounting/vendors/detail/payment-history";
import ModuleAccountingVendorSubLedgerDetail from "@/components/modules/accounting/vendors/detail/subledger";
import ModulePurchaseVendorDetailHistory from "@/components/modules/purchase/vendors/detail/history";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModuleAccountingVendorsDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/accounting/vendors")
  }

  const { data, status, message } = await getVendorAccounting({ pk: pk });

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
        title="Detail Vendor"
        actions={<ModuleAccountingVendorsDetailMenuAction />}
        withViewHelper={false}
      />

      {(
        data &&
        data.invoices &&
        data.vendor
      ) && (
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
              <ModuleContactDataDetail
                subModule="Customer"
                contact={data.vendor.contact}
                action={<ModuleContactDetailAction contactId={data.vendor.contact.pk} />}
              />
              <ModuleAccountingVendorDetailTabs
                invoice={<ModuleAccountingVendorInvoiceDetail invoices={data.invoices} />}
                payment={<ModuleAccountingVendorPaymentDetail payments={data.invoices.paymentHistory} />}
                subLedger={<ModuleAccountingVendorSubLedgerDetail subLedgers={data.subledger} />}
                aging={<ModuleAccountingVendorAgingDetail agings={data.agings as unknown as Aging[]} />}
              />
            </Flex>
            <ModulePurchaseVendorDetailHistory history={data.vendor.vendor} />
          </Flex>
        )}
    </Flex>
  )
}