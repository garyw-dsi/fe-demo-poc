"use client"

import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { CreateRequisition, createRequisitionSchema } from "@/libs/yup/purchase/requisition";
import { FormState } from "@/libs/api/constants";

import SuccessAlert from "@/components/alert/success";
import ModulePurchaseRequisitionCreateStatus from "./status";
import ModulePurchaseRequisitionDateCreate from "./date";
import ModulePurchaseRequisitionInformationCreate from "./information";
import ModulePurchaseRequisitionPaymentCreate from "./payment";
import ModulePurchaseRequisitionItemsCreate from "./items";
import ModulePurchaseRequisitionSubmit from "../button";
import { createPurchaseRequisition } from "@/app/actions/modules/purchase/requisitions";

const initialValues: CreateRequisition = {
  status: "Draft",

  payment_terms: "Cash on Delivery",
  payment_n: null,
  payment_dp_rate: null,
  payment_dp: null,
  currency: NaN,

  delivery_terms: "Ex Works",
  discount_rate: null,
  customer_id: NaN,
  lead: null,

  items: [
    { price: 0, product_id: NaN, quantity: 0, vat: 0.11 }
  ]
};

/**
 * 
 * @param currency
 * @description this components need props currency
 * it use for get all the currency use in this apps.
 * 
 * @returns 
 */
export default function ModulePurchaseRequisitionCreateForm({
  currency
}: {
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

  const [createRequisitionState, createRequisitionAction] = useFormState(
    createPurchaseRequisition,
    initialState
  )

  const onClose = () => router.push("/modules/purchase/requisitions");

  return (
    <Flex w={"full"}>
      <SuccessAlert
        isOpen={createRequisitionState.status === "success"}
        onClose={onClose}
        title="Requisition Created"
        description={createRequisitionState.message}
      />

      <Formik
        initialValues={initialValues}
        validationSchema={createRequisitionSchema}
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

          createRequisitionAction(formData)
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            {createRequisitionState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createRequisitionState.message}
              </Alert>
            )}
            <ModulePurchaseRequisitionCreateStatus />
            <ModulePurchaseRequisitionDateCreate />
            <ModulePurchaseRequisitionInformationCreate />
            <ModulePurchaseRequisitionPaymentCreate
              currency={currency}
            />
            <ModulePurchaseRequisitionItemsCreate />
            <Flex justify={'end'}>
              <ModulePurchaseRequisitionSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}