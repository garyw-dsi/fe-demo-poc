"use client"

import { useState } from "react";
import { useFormState } from "react-dom";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { organizationSchema } from "@/libs/yup/uam";
import { FormState } from "@/libs/api/constants";
import SuccessAlert from "@/components/alert/success";
import { useRouter } from "next/navigation";
import { components } from "@/libs/api/schema/uam";
import ModuleUAMOrganizationSubmit from "./button";
import { editOrganization } from "@/app/actions/modules/uam/organization";
import ModuleUAMOrganizationInformationEdit from "./organization-information";
import ModuleUAMOrganizationSetImage from "../image";

export default function ModuleUAMOrganizationEditForm({
  data
}: {
  data: components['schemas']['Organization'];
}) {
  const [file, setFile] = useState<File | null>();
  const router = useRouter();

  const initialUpdateOrganizationState: FormState = {
    status: "idle",
    message: "",
  };

  const [updateOrganizationState, setUpdateOrganization] = useFormState(
    editOrganization,
    initialUpdateOrganizationState
  );

  const onClose = () => {
    router.push("/modules/uam/organization");
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          legal_name: data.legal_name,
          legal_type: data.legal_type,
          image: data.image.url
        }}
        validationSchema={organizationSchema}
        onSubmit={(values) => {
          const formData = new FormData();

          formData.append("legal_name", values.legal_name);
          formData.append("legal_type", values.legal_type);
          formData.append("organization_id", data.pk.toString());

          if (file) {
            formData.append("image", file as Blob);
            formData.append("media_status", "changed")
          }

          if (
            values.image === data.image.url
          ) {
            formData.append("media_status", "unchanged")
          }

          if (!values.image) {
            formData.append("media_status", "deleted")
          }

          setUpdateOrganization(formData);
        }}

      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={updateOrganizationState.status === "success"}
              title="Organization Updated"
              description="Organization has been updated successfully."
              onClose={onClose}
            />

            {updateOrganizationState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {updateOrganizationState.message}
              </Alert>
            )}

            <Stack spacing={5}>
              <ModuleUAMOrganizationInformationEdit
                organizationPicture={
                  <ModuleUAMOrganizationSetImage setFile={setFile} />
                }
              />
              <Flex justify={'end'}>
                <ModuleUAMOrganizationSubmit />
              </Flex>
            </Stack>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}