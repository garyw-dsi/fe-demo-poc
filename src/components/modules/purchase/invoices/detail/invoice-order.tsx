"use client"

import { Stack } from "@chakra-ui/react"
import { components } from "@/libs/api/schema/sales"
import ModulePurchaseOrderDeliveryTerms from "@/components/modules/purchase/orders/detail/delivery-terms"
import ModulePurchaseOrderPaymentTerms from "@/components/modules/purchase/orders/detail/payment-terms"
import ModulePurchaseVendorMinimalInformation from "../../vendors/information/vendor-minimal"

export default function ModulePurchaseInvoiceOrderDetail({
  order
}: {
  order: components['schemas']['Invoice']['order']
}) {
  return (
    <Stack spacing={5}>
      <ModulePurchaseVendorMinimalInformation vendor={order?.customer.contact} />
      <ModulePurchaseOrderDeliveryTerms data={order?.delivery_terms} />
      <ModulePurchaseOrderPaymentTerms data={order as unknown as components['schemas']['Order']} />
    </Stack>
  )
}