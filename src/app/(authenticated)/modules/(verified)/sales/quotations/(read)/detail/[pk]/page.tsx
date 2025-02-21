import { redirect } from "next/navigation";
import { Flex, Stack } from "@chakra-ui/react";
import { getQuotations } from "@/app/actions/modules/sales/quotations";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesQuotationDeliveryTerms from "@/components/modules/sales/quotations/detail/delivery-terms";
import ModuleSalesQuotationDetailHistory from "@/components/modules/sales/quotations/detail/history";
import ModuleSalesQuotationOrderDetail from "@/components/modules/sales/quotations/detail/order-details";
import ModuleSalesQuotationPaymentTerms from "@/components/modules/sales/quotations/detail/payment-terms";
import ModuleSalesQuotationDetailTabs from "@/components/modules/sales/quotations/detail/tab";
import ModuleSalesQuotationStatus from "@/components/modules/sales/quotations/quotation-status";
import { ModuleSalesQuotationsDetailMenuAction } from "@/components/modules/sales/quotations/menu-action";
import ModuleSalesQuotationAction from "@/components/modules/sales/quotations/quotation-action";
import ModuleCRMCustomerInformation from "@/components/modules/crm/customers/information/customer";
import ModuleSalesQuotationIdDetail from "@/components/modules/sales/quotations/detail/quotation-id";
import ModuleSalesQuotationSendEmail from "@/components/modules/sales/quotations/send-email";
import ModuleSalesDocumentAction from "@/components/modules/sales/document-actions";
import { checkUserAction } from "@/app/actions/modules";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleSalesQuotationDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/sales/quotations")
  }

  const { data, message, status } = await getQuotations({ pk });

  const [canApproveQuotation, canCancelQuotation] = await Promise.all([
    checkUserAction({ action: "approve_quotation" }),
    checkUserAction({ action: "cancel_quotation" }),
  ]);

  if (status === 'error') {
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
        title="Detail Quotation"
        actions={
          <ModuleSalesQuotationsDetailMenuAction
            editable={data?.status === "Draft"}
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
              module="quotation"
              approveable={
                (data.status !== "Approved" &&
                  data.status !== "Issued"
                ) &&
                canApproveQuotation
              }
              cancelable={
                data.status !== "Cancelled" &&
                canCancelQuotation
              }
            />
            <Flex
              justify={'space-between'}
              w={'full'}
              direction={{ base: "column-reverse", md: "row" }}
              gap={{ base: 5, lg: 0 }}
            >
              <ModuleSalesQuotationAction
                status={data.status}
                sendEmail={<ModuleSalesQuotationSendEmail />}
              />
              <ModuleSalesQuotationStatus status={data.status} />
            </Flex>
            <ModuleSalesQuotationIdDetail quotationID={data.quotation_id} />
            <ModuleCRMCustomerInformation customer={data.customer} />
            <ModuleSalesQuotationDetailTabs
              salesOrder={<ModuleSalesQuotationOrderDetail datas={data} />}
              otherInfo={
                <Stack>
                  <ModuleSalesQuotationPaymentTerms data={data} />
                  <ModuleSalesQuotationDeliveryTerms data={data.delivery_term} />
                </Stack>
              }
            />
          </Flex>
          <ModuleSalesQuotationDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}