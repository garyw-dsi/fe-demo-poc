import { redirect } from "next/navigation";
import { Flex, Stack } from "@chakra-ui/react";
import { getOrder } from "@/app/actions/modules/sales/orders/read";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleSalesOrderDetailHistory from "@/components/modules/sales/orders/detail/history";
import ModuleSalesOrderDetailTabs from "@/components/modules/sales/orders/detail/tab";
import ModuleSalesOrderDetail from "@/components/modules/sales/orders/detail/order-details";
import ModuleSalesOrderPaymentTerms from "@/components/modules/sales/orders/detail/payment-terms";
import ModuleSalesOrderDeliveryTerms from "@/components/modules/sales/orders/detail/delivery-terms";
import { ModuleSalesOrdersDetailMenuAction } from "@/components/modules/sales/orders/menu-action";
import ModuleSalesOrderStatus from "@/components/modules/sales/orders/order-status";
import ModuleSalesOrderAction from "@/components/modules/sales/orders/order-action";
import ModuleSalesOrderSendEmail from "@/components/modules/sales/orders/send-email";
import ModuleSalesOrderIdInformation from "@/components/modules/sales/orders/detail/order-id-information";
import ModuleSalesDocumentAction from "@/components/modules/sales/document-actions";
import { checkUserAction } from "@/app/actions/modules";
import ModuleCRMCustomerInformation from "@/components/modules/crm/customers/information/customer";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleSalesOrderDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/sales/orders")
  }

  const { data, message, status } = await getOrder({ pk });

  const [canApproveOrder, canCancelOrder] = await Promise.all([
    checkUserAction({ action: "approve_order" }),
    checkUserAction({ action: "cancel_order" }),
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
        title="Detail Order"
        actions={
          <ModuleSalesOrdersDetailMenuAction
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
              module="order"
              approveable={
                (data.status !== "Approved" &&
                  data.status !== "Issued" &&
                  data.status !== "Cancelled"
                ) &&
                canApproveOrder
              }
              cancelable={
                data.status !== "Cancelled" &&
                canCancelOrder
              }
            />
            <Flex
              justify={'space-between'}
              w={'full'}
              direction={{ base: "column-reverse", md: "row" }}
              gap={{ base: 5, lg: 0 }}
            >
              <ModuleSalesOrderAction
                status={data.status}
                sendEmail={<ModuleSalesOrderSendEmail />}
              />
              <ModuleSalesOrderStatus status={data.status} />
            </Flex>

            <ModuleSalesOrderIdInformation orderId={data.order_id} />

            {data.customer && (
              <ModuleCRMCustomerInformation customer={data.customer} />
            )}

            <ModuleSalesOrderDetailTabs
              salesOrder={<ModuleSalesOrderDetail datas={data} />}
              otherInfo={
                <Stack>
                  <ModuleSalesOrderPaymentTerms data={data} />
                  <ModuleSalesOrderDeliveryTerms data={data.delivery_term} />
                </Stack>
              }
            />
          </Flex>
          <ModuleSalesOrderDetailHistory history={data} />
        </Flex>
      )}
    </Flex>
  )
}