"use client"

import { type CreateQuotation, createQuotationSchema } from "@/libs/yup/sales/quotations";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import ModuleSalesQuotationSubmit from "../button";
import ModuleSalesQuotationInformationCreate from "./information";
import ModuleSalesQuotationPaymentCreate from "./payment";
import ModuleSalesQuotationItemsCreate from "./items";
import { useFormState } from "react-dom";
import { createSalesQuotation } from "@/app/actions/modules/sales/quotations";
import { FormState } from "@/libs/api/constants";
import SuccessAlert from "@/components/alert/success";
import { useRouter, useSearchParams } from "next/navigation";
import ModuleSalesQuotationDateCreate from "./date";
import { components } from "@/libs/api/schema/core-services";
import { components as crmComponents } from "@/libs/api/schema/crm";
import ModuleCRMLeadIdInformation from "@/components/modules/crm/leads/detail/lead-id-information";
import ModuleCRMCustomerInformation from "@/components/modules/crm/customers/information/customer";
import ModuleCRMReadLeadDetail from "@/components/modules/crm/leads/detail/lead-detail";

interface Option {
  value: string;
  label: string;
}

interface VATOption extends Option {
  other: components['schemas']['VATOpt']
}

interface LeadOption extends Option {
  other: crmComponents['schemas']['Lead']
}

interface CustomerOption extends Option {
  other: crmComponents['schemas']['Customer']
}

interface InitialData {
  customer: CustomerOption | undefined;
  lead: LeadOption | undefined;
}

/**
 * 
 * @param currency
 * @description this components need props currency
 * it use for get all the currency use in this apps.
 * 
 * @returns 
 */
export default function ModuleSalesQuotationCreateForm({
  currency, customers, vats, leads, initialData
}: {
  currency: Option[] | undefined;
  customers: Option[] | undefined;
  vats: VATOption[] | undefined;
  leads: LeadOption[] | undefined;
  initialData: InitialData;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const customerId = params.get("customer_id") || undefined;
  const leadId = params.get("lead_id") || undefined;

  const initialState: FormState = {
    status: "idle",
    message: ""
  }

  const [createQuotationState, createQuotationAction] = useFormState(
    createSalesQuotation,
    initialState
  )

  const onClose = () => router.push("/modules/sales/quotations");

  return (
    <Flex w={"full"}>
      <SuccessAlert
        isOpen={createQuotationState.status === "success"}
        onClose={onClose}
        title="Quotation Created"
        description="Success create sales quotation"
      />

      <Formik
        initialValues={{
          payment_term: "Cash on Delivery",
          payment_n: null,
          payment_dp_rate: null,
          payment_dp: null,
          currency: NaN,
          discount_rate: null,

          delivery_term: "Ex Works",
          customer_id: customerId ? Number(customerId) : NaN,
          lead: leadId ? Number(leadId) : null,

          items: [
            {
              price: 0,
              product_id: NaN,
              quantity: NaN,
              vat_id: NaN,
              discount_rate: null,
              discount_amount: null,
              vat_rate: null,
              unit: ""
            }
          ]
        } as CreateQuotation}
        validationSchema={createQuotationSchema}
        onSubmit={(values) => {
          console.log(values)

          const formData = new FormData()

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

          if (values.discount_rate) {
            formData.append("discount_rate", values.discount_rate.toString())
          }

          formData.append("currency", values.currency.toString())
          formData.append("delivery_terms", values.delivery_term)

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
            <Flex gap={5}>
              <ModuleSalesQuotationDateCreate />
              {initialData.lead && (
                <ModuleCRMLeadIdInformation leadId={initialData.lead?.other.lead_id as string} />
              )}
            </Flex>

            <Flex
              gap={5}
              align={'start'}
              direction={{ base: 'column', lg: 'row' }}
            >
              {initialData.lead && (
                <ModuleCRMReadLeadDetail
                  data={initialData.lead.other}
                />
              )}
              {initialData.customer && (
                <ModuleCRMCustomerInformation
                  customer={initialData.customer.other}
                />
              )}
            </Flex>
            <ModuleSalesQuotationInformationCreate
              customers={customers}
              leads={leads}
              initialData={initialData}
            />
            <ModuleSalesQuotationPaymentCreate currency={currency} />
            <ModuleSalesQuotationItemsCreate vats={vats} />
            <Flex justify={'end'}>
              <ModuleSalesQuotationSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}