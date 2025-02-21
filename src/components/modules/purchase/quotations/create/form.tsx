"use client"

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { createQuotationSchema } from "@/libs/yup/sales/quotations";
import { FormState } from "@/libs/api/constants";
import { createPurchaseQuotation } from "@/app/actions/modules/purchase/quotations";

import SuccessAlert from "@/components/alert/success";
import ModulePurchaseQuotationSubmit from "../button";
import ModulePurchaseQuotationDateCreate from "./date";
import ModulePurchaseQuotationCreateStatus from "./status";
import ModulePurchaseQuotationInformationCreate from "./information";
import ModulePurchaseQuotationItemsCreate from "./items";
import ModulePurchaseQuotationPaymentCreate from "./payment";
import { components } from "@/libs/api/schema/sales";

/**
 * 
 * @param currency
 * @description this components need props currency
 * it use for get all the currency use in this apps.
 * 
 * @returns 
 */
export default function ModulePurchaseQuotationCreateForm({
  initialData,
  currency
}: {
  initialData?: components["schemas"]['Quotation'];
  currency: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: ""
  }

  const [createQuotationState, createQuotationAction] = useFormState(
    createPurchaseQuotation,
    initialState
  )

  const onClose = () => router.push("/modules/purchase/quotations");

  return (
    <Flex w={"full"}>
      <SuccessAlert
        isOpen={createQuotationState.status === "success"}
        onClose={onClose}
        title="Quotation Created"
        description={createQuotationState.message}
      />

      <Formik
        initialValues={{
          status: initialData?.status || "Draft",
          payment_terms: initialData?.payment_terms,
          payment_n: initialData?.payment_n,
          payment_dp_rate: initialData?.payment_dp_rate?.toFixed(2),
          payment_dp: initialData?.payment_dp?.toFixed(2),
          currency: initialData?.currency.pk || "",
          delivery_terms: initialData?.delivery_terms,
          discount_rate: initialData?.discount_rate?.toFixed(2),
          customer_id: "",
          lead: "",
          items: initialData?.items
            ? initialData.items.map((item) => {
              return {
                product_id: item.product.pk,
                quantity: item.quantity,
                price: item.price,
                vat: item.vat.rate
              }
            })
            : [{ price: 0, product_id: NaN, quantity: 0, vat: 0.11 }]
        }}
        validationSchema={createQuotationSchema}
        onSubmit={(values) => {
          console.log(values);

          const formData = new FormData()

          formData.append("status", values.status)
          formData.append("payment_terms", values.payment_terms as string)

          if (values.payment_n) {
            formData.append("payment_n", values.payment_n.toString())
          }

          if (values.payment_dp_rate) {
            formData.append("payment_dp_rate", values.payment_dp_rate.toString())
          }

          if (values.payment_dp) {
            formData.append("payment_dp", values.payment_dp.toString())
          }

          formData.append("currency", values.currency.toString())
          formData.append("delivery_terms", values.delivery_terms as string)

          if (values.discount_rate) {
            formData.append("discount_rate", values.discount_rate.toString())
          }

          formData.append("customer", values.customer_id.toString())

          if (values.lead) {
            formData.append("lead", values.lead.toString())
          }

          const items = JSON.stringify(values.items);
          formData.append("items", items)

          createQuotationAction(formData)
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            {createQuotationState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createQuotationState.message}
              </Alert>
            )}
            <ModulePurchaseQuotationCreateStatus />
            <ModulePurchaseQuotationDateCreate
              requisitionDate={initialData?.created_at}
            />
            <ModulePurchaseQuotationInformationCreate />
            <ModulePurchaseQuotationPaymentCreate
              initialData={initialData}
              currency={currency}
            />
            <ModulePurchaseQuotationItemsCreate
              initialData={initialData}
            />
            <Flex justify={'end'}>
              <ModulePurchaseQuotationSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}