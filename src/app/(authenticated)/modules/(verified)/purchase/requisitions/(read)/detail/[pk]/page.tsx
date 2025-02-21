import { redirect } from "next/navigation";
import { Flex, Stack } from "@chakra-ui/react";
import { getRequitions } from "@/app/actions/modules/purchase/requisitions";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModulePurchaseVendorInformation from "@/components/modules/purchase/vendors/information/vendor";
import ModulePurchaseRequisitionAction from "@/components/modules/purchase/requisitions/requisition-action";
import ModulePurchaseRequisitionStatus from "@/components/modules/purchase/requisitions/requisition-status";
import ModulePurchaseRequisitionDetailHistory from "@/components/modules/purchase/requisitions/detail/history";
import ModulePurchaseRequisitionDeliveryTerms from "@/components/modules/purchase/requisitions/detail/delivery-terms";
import ModulePurchaseRequisitionPaymentTerms from "@/components/modules/purchase/requisitions/detail/payment-terms";
import ModulePurchaseRequisitionDetailTabs from "@/components/modules/purchase/requisitions/detail/tab";
import ModulePurchaseRequisitionOrderDetail from "@/components/modules/purchase/requisitions/detail/order-details";
import { ModulePurchaseRequisitionsDetailMenuAction } from "@/components/modules/purchase/requisitions/menu-action";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModulePurchaseRequisitionDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/purchase/requisitions")
  }

  const { data, message, status } = await getRequitions({ pk });

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
        title="Detail Requisition"
        actions={
          <ModulePurchaseRequisitionsDetailMenuAction />
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
              <ModulePurchaseRequisitionAction />
              <ModulePurchaseRequisitionStatus status={data.quotation.status} />
            </Flex>
            <ModulePurchaseVendorInformation vendor={data.vendor} />
            <ModulePurchaseRequisitionDetailTabs
              purchsaeRequisition={<ModulePurchaseRequisitionOrderDetail datas={data.quotation} />}
              otherInfo={
                <Stack>
                  <ModulePurchaseRequisitionPaymentTerms data={data.quotation} />
                  <ModulePurchaseRequisitionDeliveryTerms data={data.quotation.delivery_terms} />
                </Stack>
              }
            />
          </Flex>
          <ModulePurchaseRequisitionDetailHistory history={data.quotation} />
        </Flex>
      )}
    </Flex>
  )
}