"use client"

import { type CreateQuotation, createQuotationSchema } from "@/libs/yup/sales/quotations";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import ModuleSalesQuotationSubmit from "../button";
import { useFormState } from "react-dom";
import { editSalesQuotation } from "@/app/actions/modules/sales/quotations";
import { FormState } from "@/libs/api/constants";
import SuccessAlert from "@/components/alert/success";
import { useRouter } from "next/navigation";
import { components } from "@/libs/api/schema/core-services";
import { components as salesComponents } from "@/libs/api/schema/sales";
import { components as crmComponents } from "@/libs/api/schema/crm";
import ModuleSalesQuotationDateEdit from "./date";
import ModuleSalesQuotationInformationEdit from "./information";
import ModuleSalesQuotationPaymentEdit from "./payment";
import ModuleSalesQuotationItemsEdit from "./items";
import ModuleSalesQuotationIdDetail from "../detail/quotation-id";
import ModuleCRMReadLeadDetail from "@/components/modules/crm/leads/detail/lead-detail";
import ModuleCRMCustomerInformation from "@/components/modules/crm/customers/information/customer";

interface Option {
  value: string;
  label: string;
}

interface VATOption extends Option {
  other: components['schemas']['VATOpt']
}

interface CustomerOption extends Option {
  other: crmComponents['schemas']['Customer']
}

interface LeadOption extends Option {
  other: crmComponents['schemas']['Lead']
}

interface InitialParamsData {
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
export default function ModuleSalesQuotationEditForm({
  initialData, currency, customers, vats, initialParamsData, leads
}: {
  initialData: salesComponents['schemas']['Quotation'];
  currency: Option[] | undefined;
  customers: Option[] | undefined;
  vats: VATOption[] | undefined;
  leads: LeadOption[] | undefined;
  initialParamsData: InitialParamsData;
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: ""
  }

  const [updateQuotationState, updateQuotationAction] = useFormState(
    editSalesQuotation,
    initialState
  )

  const onClose = () => router.push("/modules/sales/quotations");

  return (
    <Flex w={"full"}>
      <SuccessAlert
        isOpen={updateQuotationState.status === "success"}
        onClose={onClose}
        title="Quotation Updated"
        description={updateQuotationState.message}
      />

      <Formik
        initialValues={{
          currency: initialData.currency.pk,
          customer_id: initialData.customer.pk,
          delivery_term: initialData.delivery_term,
          discount_rate: (Number(initialData.discount_rate || 0) * 100).toFixed(2) || null,
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
          lead: initialData.lead?.pk,
          notes: initialData.notes,
          payment_dp: Number(initialData.payment_dp),
          payment_dp_rate: (Number(initialData.payment_dp_rate || 0) * 100).toFixed(2) || null,
          payment_n: initialData.payment_n
        } as CreateQuotation}
        validationSchema={createQuotationSchema}
        onSubmit={(values) => {
          const formData = new FormData()

          formData.append("pk", initialData.pk.toString())
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
              <ModuleSalesQuotationIdDetail quotationID={initialData.quotation_id} />
              <ModuleSalesQuotationDateEdit />
            </Flex>
            <Flex gap={5} align={'start'} direction={{ base: 'column', lg: 'row' }}>
              {(initialParamsData && initialParamsData.lead) ? (
                <ModuleCRMReadLeadDetail data={initialParamsData.lead.other} />
              ) : initialData.lead ? (
                <ModuleCRMReadLeadDetail data={initialData.lead as unknown as crmComponents['schemas']['Lead']} />
              ) : null}

              {(initialParamsData && initialParamsData.customer) ? (
                <ModuleCRMCustomerInformation customer={initialParamsData.customer.other} />
              ) : initialData.customer ? (
                <ModuleCRMCustomerInformation customer={initialData.customer} />
              ) : null}
            </Flex>

            <ModuleSalesQuotationInformationEdit
              initialData={initialData}
              customers={customers}
              leads={leads}
            />
            <ModuleSalesQuotationPaymentEdit currency={currency} initialData={initialData} />
            <ModuleSalesQuotationItemsEdit vats={vats} initialData={initialData} />
            <Flex justify={'end'}>
              <ModuleSalesQuotationSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}