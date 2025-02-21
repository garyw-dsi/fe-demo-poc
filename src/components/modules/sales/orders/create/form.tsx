"use client"

import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import ModuleSalesQuotationSubmit from "../button";
import { useFormState } from "react-dom";
import { FormState } from "@/libs/api/constants";
import SuccessAlert from "@/components/alert/success";
import { useRouter } from "next/navigation";
import { components } from "@/libs/api/schema/core-services";
import { components as salesComponents } from "@/libs/api/schema/sales";
import { components as crmComponents } from "@/libs/api/schema/crm";
import { createOrderSchema, type CreateOrder } from "@/libs/yup/sales/orders";
import { createOrder } from "@/app/actions/modules/sales/orders";
import ModuleSalesOrderDateCreate from "./date";
import ModuleSalesOrderInformationCreate from "./information";
import ModuleSalesOrderItemsCreate from "./items";
import ModuleSalesOrderPaymentCreate from "./payment";
import ModuleSalesQuotationIdDetail from "../../quotations/detail/quotation-id";
import ModuleCRMCustomerInformation from "@/components/modules/crm/customers/information/customer";

const initialValues: CreateOrder = {
  payment_term: "Cash on Delivery",
  payment_n: null,
  payment_dp_rate: null,
  payment_dp: null,
  currency: NaN,
  delivery_term: "Ex Works",
  customer_id: NaN,

  items: [
    {
      price: 0,
      product_id: NaN,
      quantity: NaN,
      vat_id: NaN,
      discount_rate: null,
      vat_rate: null,
      unit: ""
    }
  ]
};

interface Option {
  value: string;
  label: string;
}

interface VATOption extends Option {
  other: components['schemas']['VATOpt']
}

interface SelectedCustomer extends Option {
  other: crmComponents['schemas']['Customer']
}

/**
 * 
 * @param currency
 * @description this components need props currency
 * it use for get all the currency use in this apps.
 * 
 * @returns 
 */
export default function ModuleSalesOrderCreateForm({
  initialData, currency, vats, customers, selectedCustomer
}: {
  initialData?: salesComponents['schemas']['Quotation'];
  currency: Option[] | undefined;
  vats: VATOption[] | undefined;
  customers?: Option[] | undefined;
  selectedCustomer?: SelectedCustomer | undefined;
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: ""
  }

  const [createOrderState, createOrderAction] = useFormState(
    createOrder,
    initialState
  )

  const onClose = () => router.push("/modules/sales/orders");

  return (
    <Flex w={"full"}>
      <SuccessAlert
        isOpen={createOrderState.status === "success"}
        onClose={onClose}
        title="Order Created"
        description="Success create sales order"
      />

      <Formik
        initialValues={initialData
          ? {
            currency: initialData.currency.pk,
            delivery_term: initialData.delivery_term,
            items: initialData.items.map((item) => {
              return {
                price: Number(item.price),
                product_id: item.product.pk,
                quantity: Number(item.quantity),
                vat_id: Number(item.vat?.pk),
                discount_amount: item.discount_rate ? null : Number(item.discount_amount) || null,
                discount_rate: (Number(item.discount_rate || 0) * 100).toFixed(2) || null,
                vat_rate: Number(item.vat_rate),
                unit: item.product.unit
              }
            }),
            discount_rate: (Number(initialData.discount_rate || 0) * 100).toFixed(2) || null,
            payment_term: initialData.payment_term,
            notes: initialData.notes,
            payment_dp: Number(initialData.payment_dp),
            payment_dp_rate: (Number(initialData.payment_dp_rate || 0) * 100).toFixed(2) || null,
            payment_n: Number(initialData.payment_n),
            customer_id: initialData.customer.pk
          } as CreateOrder
          : initialValues
        }
        validationSchema={createOrderSchema}
        onSubmit={(values) => {
          console.log(values)

          const formData = new FormData()

          if (initialData?.pk) {
            formData.append("quotation_id", initialData.pk.toString())
          }

          formData.append("payment_terms", values.payment_term)

          if (values.notes) {
            formData.append("notes", values.notes)
          }

          if (values.payment_n) {
            formData.append("payment_n", values.payment_n.toString())
          }

          if (values.payment_dp_rate) {
            formData.append("payment_dp_rate", values.payment_dp_rate.toString())
          }

          if (values.payment_dp) {
            formData.append("payment_dp", values.payment_dp.toString())
          }

          if (values.customer_id) {
            formData.append("customer_id", values.customer_id.toString())
          }

          if (values.discount_rate) {
            formData.append("discount_rate", values.discount_rate.toString())
          }

          formData.append("currency", values.currency.toString())
          formData.append("delivery_terms", values.delivery_term)

          const items = JSON.stringify(values.items);
          formData.append("items", items)

          createOrderAction(formData)
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            {createOrderState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createOrderState.message}
              </Alert>
            )}
            <Flex gap={5} direction={{ base: "column", md: "row" }}>
              {initialData?.quotation_id && (
                <ModuleSalesQuotationIdDetail quotationID={initialData.quotation_id} />
              )}
              <ModuleSalesOrderDateCreate />
            </Flex>
            {initialData?.customer && (
              <ModuleCRMCustomerInformation customer={initialData.customer} />
            )}
            {selectedCustomer && (
              <ModuleCRMCustomerInformation customer={selectedCustomer.other} />
            )}
            <ModuleSalesOrderInformationCreate
              canAddCustomer={!initialData}
              customers={customers}
            />
            <ModuleSalesOrderPaymentCreate initialData={initialData} currency={currency} />
            <ModuleSalesOrderItemsCreate vats={vats} initialData={initialData} />
            <Flex justify={'end'}>
              <ModuleSalesQuotationSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}