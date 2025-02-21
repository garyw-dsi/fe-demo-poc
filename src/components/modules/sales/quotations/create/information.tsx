"use client"

import { Field, useFormikContext } from "formik";
import ModuleSalesQuotationFormLayout from "../layout";
import { CreateQuotation } from "@/libs/yup/sales/quotations";
import { Flex, FormControl, Stack } from "@chakra-ui/react";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { deliveryTerms } from "@/constants/modules/sales";
import ModuleSalesCustomerSelect from "../../customer";
import ModuleCRMSalesSelect from "@/components/modules/crm/leads/select";
import { components } from "@/libs/api/schema/crm";
import { useSearchParams } from "next/navigation";
import { Fragment } from "react";

interface Option {
  value: string;
  label: string;
}

interface LeadOption extends Option {
  other: components['schemas']['Lead']
}

interface InitialData {
  customer: Option | undefined;
  lead: Option | undefined;
}

type QuotationFrom = "lead";

export default function ModuleSalesQuotationInformationCreate({
  customers, leads, initialData
}: {
  customers: Option[] | undefined;
  leads: LeadOption[] | undefined;
  initialData: InitialData;
}) {
  const params = useSearchParams();

  const quotationFrom = params.get("from") as QuotationFrom;

  const { errors, touched } = useFormikContext<CreateQuotation>();

  return (
    <ModuleSalesQuotationFormLayout
      title="Quotation Information"
    >
      <Stack spacing={5}>
        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          {quotationFrom !== "lead" && (
            <Fragment>
              <FormControl
                isRequired
                isInvalid={!!errors.customer_id && !!touched.customer_id}
              >
                <ModuleInputLabel label="Customer" />
                <ModuleSalesCustomerSelect
                  fieldName="customer_id"
                  placeholder="Select Customer"
                  initialOptions={customers}
                  defaultValue={{
                    value: initialData.customer?.value || '',
                    label: initialData.customer?.label || ''
                  }}
                />
                <ModuleInputErrorMessage value={errors.customer_id} />
              </FormControl>
              <FormControl
                isInvalid={!!errors.lead && !!touched.lead}
              >
                <ModuleInputLabel label="Lead" />
                <ModuleCRMSalesSelect
                  fieldName="lead"
                  initialOptions={leads}
                  placeholder="Select Lead"
                  defaultValue={{
                    value: initialData.lead?.value || "",
                    label: initialData.lead?.label || ""
                  }}
                />
                <ModuleInputErrorMessage value={errors.lead} />
              </FormControl>
            </Fragment>
          )}
        </Flex>

        <Flex
          gap={5}
          w={'full'}
          direction={{ base: 'column', md: 'row' }}
        >
          <FormControl
            isRequired
            isInvalid={!!errors.delivery_term && !!touched.delivery_term}
          >
            <ModuleInputLabel label="Delivery Terms" />
            <Field as={ModuleInputSelect} name="delivery_term">
              {deliveryTerms.map((term) => (
                <option key={term} value={term}>
                  {term}
                </option>
              ))}
            </Field>
            <ModuleInputErrorMessage value={errors.delivery_term} />
          </FormControl>
          <FormControl
            isInvalid={!!errors.notes && !!touched.notes}
          >
            <ModuleInputLabel label="Notes" />
            <Field as={ModuleInput} name="notes" placeholder="Notes" />
            <ModuleInputErrorMessage value={errors.notes} />
          </FormControl>
        </Flex>
      </Stack>
    </ModuleSalesQuotationFormLayout>
  )
}