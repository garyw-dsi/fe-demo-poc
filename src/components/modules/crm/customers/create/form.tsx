"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { Formik } from "formik";

import { createCustomer } from "@/app/actions/modules/crm/customers";
import { FormState } from "@/libs/api/constants";

import SuccessAlert from "@/components/alert/success";
import ModuleCRMCustomerSubmit from "@/components/modules/crm/customers/button";
import { createCustomerSchema } from "@/libs/yup/crm/customers";

import ModuleCRMCustomerSetImage from "@/components/modules/crm/customers/image";
import ModuleCRMCustomerDataForm from "@/components/modules/crm/customers/create/customer-data";
import ModuleCRMCustomerIndustryForm from "@/components/modules/crm/customers/create/customer-industry";
import ModuleCRMCustomerAddressForm from "@/components/modules/crm/customers/create/customer-address";
import ModuleCRMCustomerContactCheck from "@/components/modules/crm/customers/create/contact-check";

export const initialAddressValue = {
  address: "",
  address_type: "",
  phone: "",
  name: "",
  email: "",
  phone_code: "+62"
};

type ContactExist = "exist" | "not-exist" | "idle";

export default function ModuleCRMCustomerCreateForm() {
  const {
    isOpen,
    onOpen: onOpenContactCheck,
    onClose: onCloseContactCheck
  } = useDisclosure({ defaultIsOpen: true });

  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [isContactExist, setIsContactExist] = useState<ContactExist>("idle");
  const [customerName, setCustomerName] = useState<string>("");

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [createCustomerState, createCustomerAction] = useFormState(
    createCustomer,
    initialState
  );

  const onClose = () => {
    router.push("/modules/crm/customers");
  }

  if (isOpen) {
    return (
      <ModuleCRMCustomerContactCheck
        isOpen={isOpen}
        onClose={onCloseContactCheck}
        setCustomerName={setCustomerName}
        customerName={customerName}
        isContactExist={isContactExist}
        setIsContactExist={setIsContactExist}
      />
    )
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          name: customerName,
          legal_type: "",
          tax_id: "",
          tags: [],
          industry_type: [],
          address: [],
        }}
        validationSchema={createCustomerSchema}
        onSubmit={(values) => {
          console.log(values)
          const formData = new FormData();
          formData.append("name", values.name);
          formData.append("legal_type", values.legal_type);
          formData.append("tax_id", values.tax_id);

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

          createCustomerAction(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={createCustomerState?.status === "success"}
              title="Customer Created"
              description={createCustomerState.message}
              onClose={onClose}
            />

            {createCustomerState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createCustomerState.message}
              </Alert>
            )}

            <Stack spacing={5} w={'full'}>
              <ModuleCRMCustomerDataForm
                onChangeName={onOpenContactCheck}
                customerImage={
                  <ModuleCRMCustomerSetImage setFile={setFile} />
                }
              />
              <Flex w={'full'} gap={5}
                align={'start'}
                direction={{ base: 'column', lg: 'row' }}
              >
                <ModuleCRMCustomerAddressForm />
                <Stack w={'full'}>
                  <ModuleCRMCustomerIndustryForm />
                  <Flex justify={'end'}>
                    <ModuleCRMCustomerSubmit />
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