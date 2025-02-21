"use client"

import { useFormState } from "react-dom";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertIcon, Flex, Stack } from "@chakra-ui/react";
import { Formik } from "formik";

import { createUser } from "@/app/actions/modules/uam/users";
import { createUsersSchema } from "@/libs/yup/uam";
import { FormState } from "@/libs/api/constants";
import SuccessAlert from "@/components/alert/success";
import ModuleUAMUserSubmit from "@/components/modules/uam/user/button";
import ModuleUAMUserInformationCreate from "./user-information";
import ModuleUAMUserSetImage from "../image";

export default function ModuleUAMUserCreateForm({
  initialGroups
}: {
  initialGroups: {
    value: string;
    label: string;
  }[] | undefined;
}) {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const initialCreateUserState: FormState = {
    status: "idle",
    message: "",
  };

  const [createUserState, setCreateUser] = useFormState(
    createUser,
    initialCreateUserState
  );

  const onClose = () => {
    router.push("/modules/uam/users");
  }

  return (
    <Flex w={'full'}>
      <Formik
        initialValues={{
          first_name: "",
          last_name: "",
          email: "",
          group_id: 0
        }}
        validationSchema={createUsersSchema}
        onSubmit={(values) => {
          const formData = new FormData();
          formData.append("first_name", values.first_name);
          formData.append("last_name", values.last_name);
          formData.append("email", values.email);
          formData.append("group_id", values.group_id.toString());

          if (file) {
            formData.append("image", file)
          }

          setCreateUser(formData);
        }}
      >
        {({ handleSubmit }) => (
          <Stack as="form"
            action={() => handleSubmit()}
            w={'full'}
            spacing={5}
          >
            <SuccessAlert
              isOpen={createUserState?.status === "success"}
              title="User Created"
              description="User has been created successfully."
              onClose={onClose}
            />

            {createUserState?.status === "error" && (
              <Alert status={"error"}
                fontSize={{ base: "sm", md: "xs" }}
                rounded={"md"}
                variant={'solid'}
              >
                <AlertIcon />
                {createUserState.message}
              </Alert>
            )}

            <Stack spacing={5} w={'full'}>
              <ModuleUAMUserInformationCreate
                profilePicture={<ModuleUAMUserSetImage setFile={setFile} />}
                initialGroups={initialGroups}
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