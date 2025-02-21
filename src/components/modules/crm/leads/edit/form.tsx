"use client"

import { CreateLead, createLeadSchema } from "@/libs/yup/crm/leads";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import ModuleCRMLeadSubmit from "../button";
import { FormState } from "@/libs/api/constants";
import { useFormState } from "react-dom";
import SuccessAlert from "@/components/alert/success";
import { useRouter } from "next/navigation";
import { components } from "@/libs/api/schema/crm";
import ModuleCRMLeadInformationEdit from "./lead-information";
import ModuleCRMLeadDetailEdit from "./lead-detail";
import { editLead } from "@/app/actions/modules/crm/leads";

export default function ModuleCRMLeadEditForm({
  data, leadStatus
}: {
  data: {
    phone_code: string;
  } & components["schemas"]["Lead"];
  leadStatus: React.ReactNode;
}) {
  const router = useRouter();

  const initialState: FormState = {
    status: "idle",
    message: ""
  };

  const [editLeadState, editLeadAction] = useFormState(
    editLead,
    initialState
  )

  const onClose = () => router.replace("/modules/crm/leads");

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          name: data.name,
          lead_source: data.lead_source as components['schemas']['LeadSource'],
          tags: data.tags.map((tag) => tag.pk.toString()),
          customer_id: data.customer?.pk || "",
          customer_name: data.customer_name || "",
          contact_name: data.contact_name || "",
          email: data.email || "",
          address: data.address || "",
          phone: data.phone || null,
          phone_code: data.phone_code || "+62",
          lead_score: Number(data.lead_score)
        } as CreateLead}
        validationSchema={createLeadSchema}
        onSubmit={(values) => {
          const formData = new FormData();

          formData.append("pk", data.pk.toString());
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

          editLeadAction(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={editLeadState?.status === "success"}
              title="Lead Updated"
              description={editLeadState.message}
              onClose={onClose}
            />
            {editLeadState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {editLeadState.message}
              </Alert>
            )}
            {leadStatus}
            <ModuleCRMLeadInformationEdit data={data} />
            <ModuleCRMLeadDetailEdit />
            <Flex justify={'end'}>
              <ModuleCRMLeadSubmit />
            </Flex>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}