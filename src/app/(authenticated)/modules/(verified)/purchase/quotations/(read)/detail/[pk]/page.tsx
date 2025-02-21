import { redirect } from "next/navigation";
import { Flex, Stack } from "@chakra-ui/react";
import { getQuotations } from "@/app/actions/modules/purchase/quotations";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import { ModulePurchaseQuotationsDetailMenuAction } from "@/components/modules/purchase/quotations/menu-action";
import ModulePurchaseQuotationDetailHistory from "@/components/modules/purchase/quotations/detail/history";
import ModulePurchaseQuotationAction from "@/components/modules/purchase/quotations/quotation-action";
import ModulePurchaseQuotationStatus from "@/components/modules/purchase/quotations/quotation-status";
import ModulePurchaseQuotationDetailTabs from "@/components/modules/purchase/quotations/detail/tab";
import ModulePurchaseQuotationOrderDetail from "@/components/modules/purchase/quotations/detail/order-details";
import ModulePurchaseQuotationPaymentTerms from "@/components/modules/purchase/quotations/detail/payment-terms";
import ModulePurchaseQuotationDeliveryTerms from "@/components/modules/purchase/quotations/detail/delivery-terms";
import ModulePurchaseVendorInformation from "@/components/modules/purchase/vendors/information/vendor";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModulePurchaseQuotationDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/purchase/quotations")
  }

  const { data, message, status } = await getQuotations({ pk });

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
          <ModulePurchaseQuotationsDetailMenuAction />
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
            <Flex
              justify={'space-between'}
              w={'full'}
              direction={{ base: "column-reverse", md: "row" }}
              gap={{ base: 5, lg: 0 }}
            >
              <ModulePurchaseQuotationAction />
              <ModulePurchaseQuotationStatus status={data.quotation.status} />
            </Flex>
            <ModulePurchaseVendorInformation vendor={data.vendor} />
            <ModulePurchaseQuotationDetailTabs
              purchaseOrder={<ModulePurchaseQuotationOrderDetail datas={data.quotation} />}
              otherInfo={
                <Stack>
                  <ModulePurchaseQuotationPaymentTerms data={data.quotation} />
                  <ModulePurchaseQuotationDeliveryTerms data={data.quotation.delivery_terms} />
                </Stack>
              }
            />
          </Flex>
          <ModulePurchaseQuotationDetailHistory history={data.quotation} />
        </Flex>
      )}
    </Flex>
  )
}