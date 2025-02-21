"use client"

import { CreateLead, createLeadSchema } from "@/libs/yup/crm/leads";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import ModuleCRMLeadInformationCreate from "./lead-information";
import ModuleCRMLeadDetailCreate from "./lead-detail";
import ModuleCRMLeadSubmit from "../button";
import { FormState } from "@/libs/api/constants";
import { useFormState } from "react-dom";
import { createLead } from "@/app/actions/modules/crm/leads";
import SuccessAlert from "@/components/alert/success";
import { useRouter } from "next/navigation";

const initialValues: CreateLead = {
  name: "",
  lead_source: "Website",
  tags: [],
  customer_id: NaN,
  customer_name: "",
  lead_score: 1,

  contact_name: "",
  email: "",
  address: "",
  phone: null,
  phone_code: "+62"
};

export default function ModuleCRMLeadCreateForm() {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: ""
  };

  const [createLeadState, createLeadAction] = useFormState(
    createLead,
    initialState
  )

  const onClose = () => router.replace("/modules/crm/leads");

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={initialValues}
        validationSchema={createLeadSchema}
        onSubmit={(values) => {
          const formData = new FormData();

          formData.append("name", values.name);
          formData.append("lead_source", values.lead_source);
          formData.append("lead_score", values.lead_score.toString());

          if (values.tags) {
            values.tags.forEach((tag) => {
              formData.append("tags", tag as string);
            });
          }

          if (values.customer_id) {
            formData.append("customer_id", values.customer_id.toString());
          }

          if (values.customer_name) {
            formData.append("customer_name", values.customer_name);
          }

          if (values.contact_name) {
            formData.append("contact_name", values.contact_name);
          }
          if (values.email) {
            formData.append("email", values.email);
          }
          if (values.address) {
            formData.append("address", values.address);
          }

          if (values.phone && values.phone_code) {
            formData.append("phone", values.phone);
            formData.append("phone_code", values.phone_code);
          }

          createLeadAction(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={createLeadState?.status === "success"}
              title="Lead Created"
              description={createLeadState.message}
              onClose={onClose}
            />
            {createLeadState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createLeadState.message}
              </Alert>
            )}
            <ModuleCRMLeadInformationCreate />
            <ModuleCRMLeadDetailCreate />
            <Flex justify={'end'}>
              <ModuleCRMLeadSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}