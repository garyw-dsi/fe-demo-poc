"use client"

import { importContact } from "@/app/actions/modules/core/contacts";
import {
  MainModuleActionMenuItem,
  MainModuleActionMenuItemExport,
  MainModuleActionMenuItemImport
} from "@/components/modules/main/menu-actions"
import { Button, Flex, Text } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation"
import { Fragment } from "react";

export const ModuleContactsMenuCreate = () => {
  const router = useRouter();
  return (
    <MainModuleActionMenuItem
      onClick={() => router.push("/modules/core/contacts/create")}
    >
      Create New Contact
    </MainModuleActionMenuItem>
  )
}

export const ModuleContactsMenuBatch = () => {
  const router = useRouter();

  const onTemplateDownload = () => {
    router.push("/api/templates/contact");
  };

  const onImport = async (file: File | null) => {
    console.log("import");
    console.log(file);

    try {
      const formData = new FormData();
      formData.append("file", file as File);

      const { status, message } = await importContact({ file: formData });
      if (status === "success") {
        console.log("success");
      }
      throw new Error(message);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Fragment>
      <MainModuleActionMenuItemImport
        onImport={onImport}
        fileAccept={["xls", "xlsx"]}
        templateDownload={
          <Flex align={'center'} gap={2}>
            <Button
              size={'sm'}
              fontSize={'xs'}
              variant={'link'}
              colorScheme="blue"
              onClick={onTemplateDownload}
            >
              Download
            </Button>
            <Text fontSize={'sm'}>
              the following template to import data.
            </Text>
          </Flex>
        }
      >
        Import Data
      </MainModuleActionMenuItemImport>
      <MainModuleActionMenuItemExport>
        Export Data
      </MainModuleActionMenuItemExport>
    </Fragment>
  )
}

export const ModuleContactsMenuEdit = () => {
  const router = useRouter();
  const param = useParams();

  const pk = Number(param.pk);

  return (
    <MainModuleActionMenuItem
      onClick={() => router.push(`/modules/core/contacts/edit/${pk}`)}
    >
      Edit Contact
    </MainModuleActionMenuItem>
  )
}