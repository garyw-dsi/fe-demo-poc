"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";
import { components } from "@/libs/api/schema/core-services";
import { editContactSchema } from "@/libs/yup/core/contacts";
import { updateContact } from "@/app/actions/modules/core/contacts";

import SuccessAlert from "@/components/alert/success";
import ModuleCRMCustomerSubmit from "@/components/modules/crm/customers/button";
import ModuleContactEditIndustryForm from "@/components/modules/core/contacts/edit/contact-industry";
import ModuleContactEditDataForm from "@/components/modules/core/contacts/edit/contact-data";
import ModuleContactEditAddressForm from "@/components/modules/core/contacts/edit/contact-address";
import ModuleContactSetImage from "@/components/modules/core/contacts/image";

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

interface ModuleContactEditFormProps {
  contact: components['schemas']['Contact'];
  addresses: Array<
    { phone_code: string | null; }
    & components['schemas']['Address']
  > | undefined;
  industries: components['schemas']['Industry'][] | undefined;
}

export default function ModuleContactEditForm({
  contact, addresses, industries
}: ModuleContactEditFormProps) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [addressDeleted, setAddressDeleted] = useState<number[]>([]);
  const [industryDeleted, setIndustryDeleted] = useState<number[]>([]);

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [editContactState, editContactAction] = useFormState(
    updateContact,
    initialState
  );

  const onClose = () => {
    router.push("/modules/core/contacts");
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          name: contact.name,
          legal_type: contact.legal_type,
          tax_id: contact.tax_id as string,
          image: contact.image.url,
          tags: contact.tags.map((tag) => tag.pk),
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
        validationSchema={editContactSchema}
        onSubmit={(values) => {
          console.log(values)
          const formData = new FormData();

          formData.append("pk", contact.pk.toString());
          formData.append("name", values.name);
          formData.append("legal_type", values.legal_type);
          formData.append("tax_id", values.tax_id);

          if (file) {
            formData.append("image", file as Blob);
            formData.append("media_status", "changed")
          }

          if (
            values.image === contact.image.url
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

          editContactAction(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={editContactState?.status === "success"}
              title="Contact Created"
              description={editContactState.message}
              onClose={onClose}
            />

            {editContactState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {editContactState.message}
              </Alert>
            )}

            <Stack spacing={5} w={'full'}>
              <ModuleContactEditDataForm
                contact={contact}
                contactImage={
                  <ModuleContactSetImage setFile={setFile} />
                }
              />
              <Flex
                w={'full'}
                gap={5}
                align={'start'}
                direction={{ base: 'column', xl: 'row' }}
              >
                <ModuleContactEditAddressForm
                  setAddressDeleted={setAddressDeleted}
                />
                <Stack w={'full'}>
                  <ModuleContactEditIndustryForm
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