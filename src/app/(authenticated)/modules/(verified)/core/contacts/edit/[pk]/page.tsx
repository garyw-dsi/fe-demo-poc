import { getContact } from "@/app/actions/modules/core/contacts";
import ModuleContactDetailHistory from "@/components/modules/core/contacts/detail/history";
import ModuleContactEditForm from "@/components/modules/core/contacts/edit/form";
import { ModuleContactsDetailMenuAction } from "@/components/modules/core/contacts/menu-action";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import { formattedStdPhone } from "@/utils/formatted-std-phone";
import { Flex } from "@chakra-ui/react";
import { redirect } from "next/navigation";

interface PageProps {
  params: {
    pk: string;
  }
}

export default async function ModuleContactsEditPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/core/contacts");
  }

  const {
    data,
    message,
    status
  } = await getContact({ contactId: pk });

  if (status === "error") {
    return (
      <ModuleError message={message as string} />
    )
  }

  const contactAddresses = data?.address?.map((address) => {
    if (!address.phone) {
      return {
        ...address,
        phone_code: null,
        phone: null
      };
    }

    const {
      phone_code,
      phone
    } = formattedStdPhone(address.phone);

    return { ...address, phone_code, phone }
  });


  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Edit Contact"
        actions={
          <ModuleContactsDetailMenuAction />
        }
        withViewHelper={false}
      />

      {data && (
        <Flex
          flex={1}
          justify={"space-between"}
          direction={{ base: "column", xl: "row" }}
          flexWrap={{ base: "wrap", xl: "nowrap" }}
          gap={10}
        >
          <Flex
            direction={"column"}
            w={{ base: 'full' }}
            maxW={{ base: 'full' }}
            gap={5}
          >
            <ModuleContactEditForm
              contact={data.contact}
              addresses={contactAddresses}
              industries={data.industry}
            />
          </Flex>
          <ModuleContactDetailHistory history={data.contact} />
        </Flex>
      )}
    </Flex>
  )
}