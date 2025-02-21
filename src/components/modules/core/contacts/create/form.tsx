"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";
import { createContact } from "@/app/actions/modules/core/contacts";
import { createContactSchema } from "@/libs/yup/core/contacts";

import SuccessAlert from "@/components/alert/success";
import ModuleContactDataForm from "@/components/modules/core/contacts/create/contact-data";
import ModuleContactAddressForm from "@/components/modules/core/contacts/create/contact-address";
import ModuleContactIndustryForm from "@/components/modules/core/contacts/create/contact-industry";
import ModuleContactSetImage from "@/components/modules/core/contacts/image";
import ModuleContactSubmit from "@/components/modules/core/contacts/button";

export const initialAddressValue = {
  address: "",
  address_type: "",
  phone: "",
  name: "",
  email: "",
  phone_code: "+62"
};

export default function ModuleContactCreateForm() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [createContactState, createContactAction] = useFormState(
    createContact,
    initialState
  );

  const onClose = () => {
    router.push("/modules/core/contacts");
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          name: "",
          legal_type: "",
          tax_id: "",
          tags: [],
          industry_type: [],
          address: [],
          is_customer: false,
        }}
        validationSchema={createContactSchema}
        onSubmit={(values) => {
          console.log(values)
          const formData = new FormData();

          formData.append("name", values.name);
          formData.append("legal_type", values.legal_type);
          formData.append("tax_id", values.tax_id);
          formData.append("is_customer", values.is_customer ? "true" : "false");

          values.tags.forEach((tag) => {
            formData.append("tags", tag);
          });

          values.industry_type.forEach((industry) => {
            formData.append("industry_type", industry);
          });

          if (values.address) {
            formData.append("address", JSON.stringify(values.address));
          }

          if (file) {
            formData.append("image", file);
          }

          createContactAction(formData);
        }}
      >
        {({ handleSubmit, values }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={createContactState?.status === "success"}
              title="Contact Created"
              description={createContactState.message}
              onClose={onClose}
            />

            {createContactState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createContactState.message}
              </Alert>
            )}

            <Stack spacing={5} w={'full'}>
              <Alert status={"info"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
              >
                <AlertIcon />
                {values.is_customer === true
                  ? "This contact will be added to the customer list"
                  : "This contact will not be added to the customer list"
                }
              </Alert>
              <ModuleContactDataForm
                customerImage={
                  <ModuleContactSetImage setFile={setFile} />
                }
              />
              <Flex w={'full'} gap={5}
                align={'start'}
                direction={{ base: 'column', lg: 'row' }}
              >
                <ModuleContactAddressForm />
                <Stack w={'full'}>
                  <ModuleContactIndustryForm />
                  <Flex justify={'end'}>
                    <ModuleContactSubmit />
                  </Flex>
                </Stack>
              </Flex>
            </Stack>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}