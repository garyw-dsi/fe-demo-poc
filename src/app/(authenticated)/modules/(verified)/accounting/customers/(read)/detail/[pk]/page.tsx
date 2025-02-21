import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleCRMCustomerDetailHistory from "@/components/modules/crm/customers/detail/history";
import ModuleContactDataDetail from "@/components/modules/core/contacts/detail/contact-data";
import ModuleContactDetailAction from "@/components/modules/core/contacts/detail/detail-action";
import { getCustomerAccounting } from "@/app/actions/modules/accounting/customers";
import ModuleAccountingCustomerDetailTabs from "@/components/modules/accounting/customers/detail/tab";
import ModuleAccountingCustomerInvoiceDetail from "@/components/modules/accounting/customers/detail/invoice-detail";
import ModuleAccountingCustomerPaymentDetail from "@/components/modules/accounting/customers/detail/payment-history";
import { ModuleAccountingCustomersDetailMenuAction } from "@/components/modules/accounting/customers/menu-action";
import ModuleAccountingCustomerSubLedgerDetail from "@/components/modules/accounting/customers/detail/subledger";
import ModuleAccountingCustomerAgingDetail from "@/components/modules/accounting/customers/detail/ar-aging";
import { Aging } from "@/components/modules/accounting/customers/detail/type.static";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}

export default async function ModuleAccountingCustomersDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/accounting/customers")
  }

  const { data, status, message } = await getCustomerAccounting({ pk: pk });

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
        title="Detail Customer"
        actions={<ModuleAccountingCustomersDetailMenuAction />}
        withViewHelper={false}
      />

      {(
        data &&
        data.invoices &&
        data.customer
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
                contact={data.customer.contact}
                action={<ModuleContactDetailAction contactId={data.customer.contact.pk} />}
              />
              <ModuleAccountingCustomerDetailTabs
                invoice={<ModuleAccountingCustomerInvoiceDetail invoices={data.invoices} />}
                payment={<ModuleAccountingCustomerPaymentDetail payments={data.invoices.paymentHistory} />}
                subLedger={<ModuleAccountingCustomerSubLedgerDetail subLedgers={data.subledger} />}
                aging={<ModuleAccountingCustomerAgingDetail agings={data.agings as unknown as Aging[]} />}
              />
            </Flex>
            <ModuleCRMCustomerDetailHistory history={data.customer.customer} />
          </Flex>
        )}
    </Flex>
  )
}