import { checkUserAction } from "@/app/actions/modules";
import { getInvoice } from "@/app/actions/modules/sales/invoices";
import ModuleCRMCustomerMinimalInformation from "@/components/modules/crm/customers/information/customer-minimal";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesDocumentAction from "@/components/modules/sales/document-actions";
import ModuleSalesInvoiceDetailHistory from "@/components/modules/sales/invoices/detail/history";
import ModuleSalesInvoiceIdInformation from "@/components/modules/sales/invoices/detail/invoice-id-information";
import ModuleSalesInvoiceItems from "@/components/modules/sales/invoices/detail/invoice-items";
import ModuleSalesInvoiceNotesInformation from "@/components/modules/sales/invoices/detail/notes";
import ModuleSalesInvoiceDetailTabs from "@/components/modules/sales/invoices/detail/tab";
import ModuleSalesInvoiceStatus from "@/components/modules/sales/invoices/invoice-status";
import { ModuleSalesInvoicesDetailMenuAction } from "@/components/modules/sales/invoices/menu-action";
import ModuleSalesInvoiceSendEmail from "@/components/modules/sales/invoices/send-email";
import ModuleSalesOrderDeliveryTerms from "@/components/modules/sales/orders/detail/delivery-terms";
import ModuleSalesOrderPaymentTerms from "@/components/modules/sales/orders/detail/payment-terms";
import { components } from "@/libs/api/schema/sales";
import { Flex, Stack } from "@chakra-ui/react";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

interface pageProps {
  params: {
    pk: string
  }
}

export default async function ModuleSalesInvoicesReadDetailPage({
  params
}: pageProps) {
  const pk = Number(params.pk);

  if (!pk) {
    redirect("/modules/sales/invoices");
  }

  const { data, status, message } = await getInvoice({ pk });

  const [canApproveInvoice, canCancelInvoice] = await Promise.all([
    checkUserAction({ action: "approve_invoice" }),
    checkUserAction({ action: "cancel_invoice" }),
  ]);

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
        actions={
          <ModuleSalesInvoicesDetailMenuAction
            editable={data && data.status === "Draft"}
          />
        }
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
            <ModuleSalesDocumentAction
              module="invoice"
              approveable={
                data.status !== "Approved" &&
                data.status !== "Cancelled" &&
                canApproveInvoice
              }
              cancelable={
                data.status !== "Cancelled" &&
                canCancelInvoice
              }
            />
            <Flex
              justify={!["Draft", "Cancelled"].includes(data.status) ? 'space-between' : 'end'}
              w={'full'}
              direction={{ base: "column-reverse", md: "row" }}
              gap={{ base: 5, lg: 0 }}
            >
              {!["Draft", "Cancelled"].includes(data.status) && (
                <ModuleSalesInvoiceSendEmail />
              )}
              <ModuleSalesInvoiceStatus status={data.status} />
            </Flex>

            <Stack>
              <ModuleSalesInvoiceIdInformation invoiceId={data.invoice_id} />
              <ModuleSalesInvoiceNotesInformation notes={data.notes} />
            </Stack>

            {data.order.quotation && (
              <ModuleCRMCustomerMinimalInformation customer={data.order.quotation?.customer.contact} />
            )}

            <ModuleSalesInvoiceDetailTabs
              invoices={<ModuleSalesInvoiceItems datas={data} />}
              otherInfo={
                <Stack>
                  <ModuleSalesOrderPaymentTerms data={data.order as unknown as components['schemas']['Order']} />
                  <ModuleSalesOrderDeliveryTerms data={data.order.delivery_term} />
                </Stack>
              }
            />
          </Flex>
          <ModuleSalesInvoiceDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}