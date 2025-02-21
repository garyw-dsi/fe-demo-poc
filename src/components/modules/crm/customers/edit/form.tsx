"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";

import { editCustomerSchema } from "@/libs/yup/crm/customers";
import { components } from "@/libs/api/schema/core-services";

import SuccessAlert from "@/components/alert/success";
import ModuleCRMCustomerSubmit from "@/components/modules/crm/customers/button";
import ModuleCRMCustomerSetImage from "@/components/modules/crm/customers/image";
import ModuleCRMCustomerEditIndustryForm from "@/components/modules/crm/customers/edit/customer-industry";
import ModuleCRMCustomerEditDataForm from "@/components/modules/crm/customers/edit/customer-data";
import ModuleCRMCustomerEditAddressForm from "@/components/modules/crm/customers/edit/customer-address";
import { updateCustomer } from "@/app/actions/modules/crm/customers/edit";

export const initialEditAddressValue = {
  pk: null, // null meaning new address and to be created
  address: "",
  address_type: "",
  phone: "",
  name: "",
  email: "",
  phone_code: "+62"
};

export const initialEditIndustryValue = {
  pk: null, // null meaning new industry and to be created
  type: "",
};

interface ModuleCRMCustomerEditFormProps {
  customer: components['schemas']['Contact'];
  addresses: Array<
    { phone_code: string | null; }
    & components['schemas']['Address']
  > | undefined;
  industries: components['schemas']['Industry'][] | undefined;
}

export default function ModuleCRMCustomerEditForm({
  customer, addresses, industries
}: ModuleCRMCustomerEditFormProps) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [addressDeleted, setAddressDeleted] = useState<number[]>([]);
  const [industryDeleted, setIndustryDeleted] = useState<number[]>([]);

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [editCustomerState, editCustomerAction] = useFormState(
    updateCustomer,
    initialState
  );

  const onClose = () => {
    router.push("/modules/crm/customers");
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          name: customer.name,
          legal_type: customer.legal_type,
          tax_id: customer.tax_id as string,
          image: customer.image.url,
          tags: customer.tags.map((tag) => tag.pk),
          industry: industries
            ? industries?.map((industry) => ({
              type: industry.industry_type,
              pk: industry.pk
            }))
            : [],
          address: addresses
            ? addresses?.map((address) => ({
              pk: address.pk,
              address: address.address,
              address_type: address.address_type,
              phone: address.phone,
              name: address.name,
              email: address.email,
              phone_code: address.phone_code
            }))
            : []
        }}
        validationSchema={editCustomerSchema}
        onSubmit={(values) => {
          console.log(values)
          const formData = new FormData();

          formData.append("pk", customer.pk.toString());
          formData.append("name", values.name);
          formData.append("legal_type", values.legal_type);
          formData.append("tax_id", values.tax_id);

          if (file) {
            formData.append("image", file as Blob);
            formData.append("media_status", "changed")
          }

          if (
            values.image === customer.image.url
          ) {
            formData.append("media_status", "unchanged")
          }

          if (!values.image) {
            formData.append("media_status", "deleted")
          }

          if (values.tags.length > 0) {
            values.tags.forEach((tag) => {
              formData.append("tags", tag.toString());
            });
          }

          if (addressDeleted.length > 0) {
            addressDeleted.forEach((pk) => {
              formData.append("address_deleted", pk.toString());
            });
          }

          if (values.address) {
            formData.append("address", JSON.stringify(values.address));
          }

          if (industryDeleted.length > 0) {
            industryDeleted.forEach((pk) => {
              formData.append("industry_deleted", pk.toString());
            });
          }

          if (values.industry) {
            formData.append("industry", JSON.stringify(values.industry));
          }

          editCustomerAction(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={editCustomerState?.status === "success"}
              title="Customer Created"
              description={editCustomerState.message}
              onClose={onClose}
            />

            {editCustomerState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {editCustomerState.message}
              </Alert>
            )}

            <Stack spacing={5} w={'full'}>
              <ModuleCRMCustomerEditDataForm
                customer={customer}
                customerImage={
                  <ModuleCRMCustomerSetImage setFile={setFile} />
                }
              />
              <Flex
                w={'full'}
                gap={5}
                align={'start'}
                direction={{ base: 'column', xl: 'row' }}
              >
                <ModuleCRMCustomerEditAddressForm
                  setAddressDeleted={setAddressDeleted}
                />
                <Stack w={'full'}>
                  <ModuleCRMCustomerEditIndustryForm
                    setIndustryDeleted={setIndustryDeleted}
                  />
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