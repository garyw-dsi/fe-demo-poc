"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex, Stack, useDisclosure } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";
import { createVendor } from "@/app/actions/modules/purchase/vendors";
import { createVendorSchema } from "@/libs/yup/purchase/vendors";

import SuccessAlert from "@/components/alert/success";
import ModulePurchaseVendorSubmit from "@/components/modules/purchase/vendors/button";

import ModulePurchaseVendorSetImage from "@/components/modules/purchase/vendors/image";
import ModulePurchaseVendorDataForm from "@/components/modules/purchase/vendors/create/vendor-data";
import ModulePurchaseVendorIndustryForm from "@/components/modules/purchase/vendors/create/vendor-industry";
import ModulePurchaseVendorAddressForm from "@/components/modules/purchase/vendors/create/vendor-address";
import ModulePurchaseVendorContactCheck from "@/components/modules/purchase/vendors/create/contact-check";

export const initialAddressValue = {
  address: "",
  address_type: "",
  phone: "",
  name: "",
  email: "",
  phone_code: "+62"
};

type ContactExist = "exist" | "not-exist" | "idle";

export default function ModulePurchaseVendorCreateForm() {
  const {
    isOpen,
    onOpen: onOpenContactCheck,
    onClose: onCloseContactCheck
  } = useDisclosure({ defaultIsOpen: true });

  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [isContactExist, setIsContactExist] = useState<ContactExist>("idle");
  const [vendorName, setVendorName] = useState<string>("");

  const initialState: FormState = {
    status: "idle",
    message: "",
  };

  const [createVendorState, createVendorAction] = useFormState(
    createVendor,
    initialState
  );

  const onClose = () => {
    router.push("/modules/purchase/vendors");
  }

  if (isOpen) {
    return (
      <ModulePurchaseVendorContactCheck
        isOpen={isOpen}
        onClose={onCloseContactCheck}
        setVendorName={setVendorName}
        vendorName={vendorName}
        isContactExist={isContactExist}
        setIsContactExist={setIsContactExist}
      />
    )
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          name: vendorName,
          legal_type: "",
          tax_id: "",
          tags: [],
          industry_type: [],
          address: [],
        }}
        validationSchema={createVendorSchema}
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

          createVendorAction(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={createVendorState?.status === "success"}
              title="Vendor Created"
              description={createVendorState.message}
              onClose={onClose}
            />

            {createVendorState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createVendorState.message}
              </Alert>
            )}

            <Stack spacing={5} w={'full'}>
              <ModulePurchaseVendorDataForm
                onChangeName={onOpenContactCheck}
                vendorImage={
                  <ModulePurchaseVendorSetImage setFile={setFile} />
                }
              />
              <Flex w={'full'} gap={5}
                align={'start'}
                direction={{ base: 'column', lg: 'row' }}
              >
                <ModulePurchaseVendorAddressForm />
                <Stack w={'full'}>
                  <ModulePurchaseVendorIndustryForm />
                  <Flex justify={'end'}>
                    <ModulePurchaseVendorSubmit />
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