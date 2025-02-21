import { redirect } from "next/navigation";
import { Flex, Stack } from "@chakra-ui/react";
import { getOrder } from "@/app/actions/modules/sales/orders/read";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import { ModulePurchaseOrdersDetailMenuAction } from "@/components/modules/purchase/orders/menu-action";
import ModulePurchaseOrderAction from "@/components/modules/purchase/orders/order-action";
import ModulePurchaseOrderStatus from "@/components/modules/purchase/orders/order-status";
import ModulePurchaseOrderDetailTabs from "@/components/modules/purchase/orders/detail/tab";
import ModulePurchaseOrderDetail from "@/components/modules/purchase/orders/detail/order-details";
import ModulePurchaseOrderPaymentTerms from "@/components/modules/purchase/orders/detail/payment-terms";
import ModulePurchaseOrderDeliveryTerms from "@/components/modules/purchase/orders/detail/delivery-terms";
import ModulePurchaseOrderDetailHistory from "@/components/modules/purchase/orders/detail/history";
import ModulePurchaseVendorMinimalInformation from "@/components/modules/purchase/vendors/information/vendor-minimal";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModulePurchaseOrderDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/purchase/orders")
  }

  const { data, message, status } = await getOrder({ pk });

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
        title="Detail Order"
        actions={
          <ModulePurchaseOrdersDetailMenuAction />
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
              <ModulePurchaseOrderAction />
              <ModulePurchaseOrderStatus status={data.status} />
            </Flex>
            <ModulePurchaseVendorMinimalInformation vendor={data.quotation?.customer.contact} />
            <ModulePurchaseOrderDetailTabs
              salesOrder={<ModulePurchaseOrderDetail datas={data} />}
              otherInfo={
                <Stack>
                  <ModulePurchaseOrderPaymentTerms data={data} />
                  <ModulePurchaseOrderDeliveryTerms data={data.delivery_terms} />
                </Stack>
              }
            />
          </Flex>
          <ModulePurchaseOrderDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}