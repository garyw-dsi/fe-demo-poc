"use client"

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";
import { components } from "@/libs/api/schema/sales";
import { components as coreComponents } from "@/libs/api/schema/core-services";

import SuccessAlert from "@/components/alert/success";
import ModuleSalesInvoiceItemsCreate from "./items";
import ModuleSalesInvoiceDateCreate from "./date";
import ModuleSalesInvoiceSubmit from "../button";
import { createInvoice } from "@/app/actions/modules/sales/invoices";
import { CreateInvoice, createInvoiceSchema } from "@/libs/yup/sales/invoices";
import ModuleCRMCustomerMinimalInformation from "@/components/modules/crm/customers/information/customer-minimal";
import ModuleSalesOrderDeliveryTerms from "../../orders/detail/delivery-terms";
import ModuleSalesOrderPaymentTerms from "../../orders/detail/payment-terms";
import ModuleSalesOrderIdInformation from "../../orders/detail/order-id-information";
import ModuleSalesInvoiceInformationCreate from "./information";

/**
 * 
 * @param currency
 * @description this components need props currency
 * it use for get all the currency use in this apps.
 * 
 * @returns 
 */
export default function ModuleSalesInvoiceCreateForm({
  initialData, vats
}: {
  initialData: components["schemas"]['Order'];
  vats: {
    value: string;
    label: string;
    other: coreComponents['schemas']['VATOpt']
  }[] | undefined;
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: ""
  }

  const [createInvoiceState, createInvoiceAction] = useFormState(
    createInvoice,
    initialState
  )

  const onClose = () => router.push("/modules/sales/invoices");

  return (
    <Flex w={"full"}>
      <SuccessAlert
        isOpen={createInvoiceState.status === "success"}
        onClose={onClose}
        title="Invoice Created"
        description={createInvoiceState.message}
      />

      <Formik
        initialValues={{
          notes: initialData?.notes,
          discount_rate: Number(initialData?.discount_rate || 0) * 100 || null,
          items: initialData?.items.map((item) => {
            return {
              quantity: Number(item.quantity),
              price: Number(item.price),
              discount_rate: (Number(item.discount_rate || 0) * 100).toFixed(2) || null,
              discount_amount: item.discount_rate ? null : Number(item.discount_amount) || null,
              vat_rate: Number(item.vat_rate),
              order_item_id: item.pk,
              vat_id: item.vat?.pk
            }
          })
        } as CreateInvoice}
        validationSchema={createInvoiceSchema}
        onSubmit={(values) => {
          const formData = new FormData()

          formData.append("order_id", initialData.pk.toString())

          if (values.notes) {
            formData.append("notes", values.notes)
          }

          if (values.discount_rate) {
            formData.append("discount_rate", values.discount_rate.toString())
          }

          const items = JSON.stringify(values.items);
          formData.append("items", items)

          createInvoiceAction(formData)
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            {createInvoiceState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createInvoiceState.message}
              </Alert>
            )}
            <Flex gap={5} direction={{ base: "column", md: "row" }}>
              <ModuleSalesOrderIdInformation orderId={initialData.order_id} />
              <ModuleSalesInvoiceDateCreate />
            </Flex>

            {initialData.customer && (
              <ModuleCRMCustomerMinimalInformation
                customer={initialData.customer.contact}
              />
            )}
            <Flex gap={5} direction={{ base: "column", md: "row" }}>
              <ModuleSalesOrderDeliveryTerms data={initialData.delivery_term} />
              <ModuleSalesOrderPaymentTerms data={initialData} />
            </Flex>
            <ModuleSalesInvoiceInformationCreate />
            <ModuleSalesInvoiceItemsCreate
              initialData={initialData}
              vats={vats}
            />
            <Flex justify={'end'}>
              <ModuleSalesInvoiceSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}