import { Flex, FormControl, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import ModuleCRMLeadsFormLayout from "../layout";
import { Field, useFormikContext } from "formik";
import { CreateLead } from "@/libs/yup/crm/leads";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { leadScoreTerms, leadSource } from "@/constants/modules/crm";
import ModuleTagSelect from "@/components/modules/core/tags/select";
import ModuleCRMCustomerSelect from "../../customers/select";
import { getCustomer } from "@/app/actions/modules/crm/customers";
import { viewFormattedStdPhoneToObj } from "@/utils/formatted-std-phone";

export default function ModuleCRMLeadInformationCreate() {
  const {
    errors,
    touched,
    values,
    setFieldValue
  } = useFormikContext<CreateLead>();

  const handleCustomerSelect = async (customerId: string, customerName: string) => {
    setFieldValue("customer_id", customerId);
    setFieldValue("customer_name", customerName);

    if (customerId) {
      const response = await getCustomer({ pk: parseInt(customerId) });
      if (response.status === "success" && response.data) {
        const { address } = response.data;

        if(address){
          const newAddress = address[0];
          setFieldValue("contact_name", newAddress.name || "");
          setFieldValue("email", newAddress.email || "");
          setFieldValue("address", newAddress.address || "");

          if(!newAddress.phone){
            return;
          }

          const { phone, phone_code } = viewFormattedStdPhoneToObj(newAddress.phone || "");
          setFieldValue("phone", phone || "");
          setFieldValue("phone_code", phone_code || "+62");
        }
      }
    }
  };

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
              placeholder="Type customer name..."
              onSelect={handleCustomerSelect}
            />
            <ModuleInputErrorMessage value={errors.customer_name || errors.customer_id} />
          </FormControl>
          <FormControl
            isInvalid={!!errors.tags && touched.tags}
          >
            <ModuleInputLabel label="Lead Tags" />
            <ModuleTagSelect
              placeholder="Select tag"
              fieldName="tags"
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
                onChange={(value) => setFieldValue("lead_source", value)}
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
                <option key={index} value={index+1}>
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