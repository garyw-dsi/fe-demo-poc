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
import ModuleSalesQuotationDateEdit from "./date";
import ModuleSalesOrderItemsEdit from "./items";
import { type CreateOrder, createOrderSchema } from "@/libs/yup/sales/orders";
import ModuleSalesOrderInformationEdit from "./information";
import ModuleSalesOrderPaymentEdit from "./payment";
import { editSalesOrder } from "@/app/actions/modules/sales/orders";
import ModuleSalesOrderIdInformation from "../detail/order-id-information";

interface Option {
  value: string;
  label: string;
}

interface VATOption extends Option {
  other: components['schemas']['VATOpt']
}

/**
 * 
 * @param currency
 * @description this components need props currency
 * it use for get all the currency use in this apps.
 * 
 * @returns 
 */
export default function ModuleSalesOrderEditForm({
  initialData, currency, vats, customers
}: {
  initialData: salesComponents['schemas']['Order'];
  currency: Option[] | undefined;
  vats: VATOption[] | undefined;
  customers: Option[] | undefined;
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: ""
  }

  const [updateQuotationState, updateQuotationAction] = useFormState(
    editSalesOrder,
    initialState
  )

  const onClose = () => router.push("/modules/sales/orders");

  return (
    <Flex w={"full"}>
      <SuccessAlert
        isOpen={updateQuotationState.status === "success"}
        onClose={onClose}
        title="Order Updated"
        description={updateQuotationState.message}
      />

      <Formik
        initialValues={{
          currency: initialData.currency.pk,
          delivery_term: initialData.delivery_term,
          customer_id: initialData.customer.pk,
          items: initialData.items.map((item) => {
            return {
              price: Number(item.price),
              product_id: item.product.pk,
              quantity: Number(item.quantity),
              vat_id: Number(item.vat?.pk),
              discount_rate: (Number(item.discount_rate || 0) * 100).toFixed(2) || null,
              discount_amount: item.discount_rate ? null : Number(item.discount_amount) || null,
              vat_rate: Number(item.vat_rate),
              unit: item.product.unit
            }
          }),
          payment_term: initialData.payment_term,
          notes: initialData.notes,
          payment_dp: Number(initialData.payment_dp),
          payment_dp_rate: (Number(initialData.payment_dp_rate || 0) * 100).toFixed(2) || null,
          payment_n: initialData.payment_n,
          discount_rate: (Number(initialData.discount_rate || 0) * 100).toFixed(2) || null
        } as CreateOrder}
        validationSchema={createOrderSchema}
        onSubmit={(values) => {
          const formData = new FormData()

          formData.append("pk", initialData.pk.toString())
          formData.append("payment_terms", values.payment_term)

          if (values.customer_id) {
            formData.append("customer_id", values.customer_id.toString())
          }

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

          if (values.discount_rate) {
            formData.append("discount_rate", values.discount_rate.toString())
          }

          formData.append("currency", values.currency.toString())
          formData.append("delivery_terms", values.delivery_term)

          const items = JSON.stringify(values.items);
          formData.append("items", items)

          updateQuotationAction(formData)
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            {updateQuotationState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {updateQuotationState.message}
              </Alert>
            )}
            <Flex gap={5} direction={{ base: "column", md: "row" }}>
              <ModuleSalesOrderIdInformation orderId={initialData.order_id} />
              <ModuleSalesQuotationDateEdit />
            </Flex>
            <ModuleSalesOrderInformationEdit
              initialData={initialData}
              customers={customers}
            />
            <ModuleSalesOrderPaymentEdit
              initialData={initialData}
              currency={currency}
            />
            <ModuleSalesOrderItemsEdit vats={vats} initialData={initialData} />
            <Flex justify={'end'}>
              <ModuleSalesQuotationSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}