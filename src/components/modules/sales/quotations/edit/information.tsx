"use client"

import { Field, useFormikContext } from "formik";
import ModuleSalesQuotationFormLayout from "../layout";
import { CreateQuotation } from "@/libs/yup/sales/quotations";
import { Flex, FormControl, Stack } from "@chakra-ui/react";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { deliveryTerms } from "@/constants/modules/sales";
import ModuleSalesCustomerSelect from "../../customer";
import ModuleCRMSalesSelect from "@/components/modules/crm/leads/select";
import { components } from "@/libs/api/schema/sales";
import { components as crmComponents } from "@/libs/api/schema/crm";

export default function ModuleSalesQuotationInformationEdit({
  initialData,
  customers,
  leads
}: {
  initialData: components['schemas']['Quotation'];
  customers: {
    value: string;
    label: string
  }[] | undefined;
  leads: {
    value: string;
    label: string;
    other: crmComponents['schemas']['Lead']
  }[] | undefined;
}) {
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
                value: initialData.customer.pk.toString(),
                label: initialData.customer.contact.name
              }}
            />
            <ModuleInputErrorMessage value={errors.customer_id} />
          </FormControl>
          <FormControl
            isInvalid={!!errors.lead && !!touched.lead}
          >
            <ModuleInputLabel label="Lead" />
            <ModuleCRMSalesSelect fieldName="lead" placeholder="Select Lead" initialOptions={leads} defaultValue={{
              value: initialData.lead?.pk.toString() || "",
              label: initialData.lead?.name || "",
              other: initialData.lead as unknown as crmComponents['schemas']['LeadOpt']
            }} />
            <ModuleInputErrorMessage value={errors.lead} />
          </FormControl>
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