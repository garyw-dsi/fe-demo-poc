"use client"

import { Flex, Stack, Text } from "@chakra-ui/react"
import { components } from "@/libs/api/schema/sales"
import ModulePurchaseInvoiceFormLayout from "../layout"
import ModulePurchaseQuotationDeliveryTerms from "../../quotations/detail/delivery-terms"
import ModulePurchaseQuotationPaymentTerms from "../../quotations/detail/payment-terms"
import ModulePurchaseVendorMinimalInformation from "../../vendors/information/vendor-minimal"

export default function ModulePurchaseInvoiceQuotationDetail({
  quotation
}: {
  quotation: components['schemas']['QuotationMin'] | null | undefined
}) {

  if (!quotation) {
    return (
      <ModulePurchaseInvoiceFormLayout title="Quotation Detail">
        <Flex w={'full'} justify={'center'} align={'center'} py={8}>
          <Text fontSize={'sm'} color={'gray.500'}>
            Quotation not found
          </Text>
        </Flex>
      </ModulePurchaseInvoiceFormLayout>
    )
  }

  return (
    <Stack spacing={5}>
      <ModulePurchaseVendorMinimalInformation vendor={quotation.customer.contact} />
      <ModulePurchaseQuotationDeliveryTerms data={quotation.delivery_terms} />
      <ModulePurchaseQuotationPaymentTerms data={quotation as unknown as components['schemas']['Order']} />
    </Stack>
  )
}