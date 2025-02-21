import { Flex, FormControl, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import ModuleCRMLeadsFormLayout from "../layout";
import { Field, useFormikContext } from "formik";
import { CreateLead } from "@/libs/yup/crm/leads";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { leadScoreTerms, leadSource } from "@/constants/modules/crm";
import ModuleTagSelect from "@/components/modules/core/tags/select";
import ModuleCRMCustomerSelect from "../../customers/select";
import { components } from "@/libs/api/schema/crm";

export default function ModuleCRMLeadInformationEdit({
  data
}: {
  data: {
    phone_code: string;
  } & components["schemas"]["Lead"]
}) {
  const {
    errors,
    touched,
    values,
    setFieldValue,
    setTouched
  } = useFormikContext<CreateLead>();

  return (
    <ModuleCRMLeadsFormLayout
      title="Lead Information"
    >
      <Stack spacing={5}>
        <FormControl
          isRequired
          isInvalid={!!errors.name && touched.name}
        >
          <ModuleInputLabel label="Opportunity Name" />
          <Field as={ModuleInput} name="name" placeholder="Opportunity Name" />
          <ModuleInputErrorMessage value={errors.name} />
        </FormControl>
        <Flex gap={5} direction={{ base: 'column', lg: 'row' }}>
          <FormControl
            isRequired
            isInvalid={!!errors.customer_name && touched.customer_name}
          >
            <ModuleInputLabel label="Customer Name" />
            <ModuleCRMCustomerSelect
              fieldName={[
                "customer_id",
                "customer_name"
              ]}
              defaultValue={{
                label: data.customer_name as string,
                value: String(data.customer?.pk || "")
              }}
              placeholder="Type customer name..."
            />
            <ModuleInputErrorMessage value={errors.customer_name || errors.customer_id} />
          </FormControl>
          <FormControl
            isInvalid={!!errors.tags && Boolean(touched.tags)}
          >
            <ModuleInputLabel label="Lead Tags" />
            <ModuleTagSelect
              placeholder="Select tag"
              fieldName="tags"
              defaultValue={data.tags.map((tag) => ({
                label: tag.name,
                value: tag.pk.toString()
              }))}
            />
            <ModuleInputErrorMessage value={errors.tags as string} />
          </FormControl>
        </Flex>
        <FormControl
          isRequired
          isInvalid={!!errors.lead_source && touched.lead_source}
        >
          <ModuleInputLabel label="Lead Source" />
          <Field name="lead_source">
            {() => (
              <RadioGroup
                name="lead_source"
                value={values.lead_source || ""}
                onChange={(value) => {
                  setFieldValue("lead_source", value)
                  setTouched({ lead_source: true })
                }}
              >
                <Flex align={'center'} gap={5} flexWrap={'wrap'}>
                  {leadSource.map((source, index) => (
                    <Radio key={index}
                      value={source}
                      size={'sm'}
                    >
                      {source}
                    </Radio>
                  ))}
                </Flex>
              </RadioGroup>
            )}
          </Field>
          <ModuleInputErrorMessage value={errors.lead_source} />
        </FormControl>
        <FormControl
          isRequired
          isInvalid={!!errors.lead_score && touched.lead_score}
        >
          <ModuleInputLabel label="Lead Score" />
            <Field as={ModuleInputSelect} name="lead_score">
              {leadScoreTerms.map((term, index) => (
                <option key={index} value={index}>
                  {term}
                </option>
              ))}
            </Field>
          <ModuleInputErrorMessage value={errors.lead_score} />
        </FormControl>
      </Stack>
    </ModuleCRMLeadsFormLayout>
  )
}