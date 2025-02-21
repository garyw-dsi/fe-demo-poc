"use client"

import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";
import { useState } from "react";

import SuccessAlert from "@/components/alert/success";
import { FormState } from "@/libs/api/constants";

import { editUserSchema } from "@/libs/yup/uam";
import { editUser } from "@/app/actions/modules/uam/users";
import ModuleUAMUserSubmit from "@/components/modules/uam/user/button";
import { components } from "@/libs/api/schema/uam";
import ModuleUAMUserInformationEdit from "./user-information";
import ModuleUAMUserSetImage from "../image";

export default function ModuleUAMUserEditForm({
  data, initialGroups
}: {
  data: components['schemas']['User'];
  initialGroups: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const initialEditUserState: FormState = {
    status: "idle",
    message: "",
  };

  const [editUserState, setEditUser] = useFormState(
    editUser,
    initialEditUserState
  );

  const onClose = () => {
    router.push("/modules/uam/users");
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          group_id: data.group?.pk || 0,
          image: data.image.url,
          is_locked: data.is_locked,
          is_active: data.is_active,
        }}
        validationSchema={editUserSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("first_name", values.first_name);
          formData.append("last_name", values.last_name);
          formData.append("group_id", values.group_id.toString());
          formData.append("user_id", data.pk.toString());

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

          formData.append("is_locked", values.is_locked.toString());

          formData.append("is_active", values.is_active.toString());

          setEditUser(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={editUserState.status === "success"}
              title="User Updated"
              description="User has been updated successfully."
              onClose={onClose}
            />

            {editUserState.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {editUserState.message}
              </Alert>
            )}

            <Stack spacing={5} w={'full'}>
              <ModuleUAMUserInformationEdit
                initialGroups={initialGroups}
                profilePicture={
                  <ModuleUAMUserSetImage setFile={setFile} />
                }
                defaultGroup={{
                  value: data.group?.pk.toString() || "",
                  label: data.group?.name || ""
                }}
              />
              <Flex justify={'end'}>
                <ModuleUAMUserSubmit />
              </Flex>
            </Stack>
          </Stack>
        )}
      </Formik>
    </Flex>
  )
}