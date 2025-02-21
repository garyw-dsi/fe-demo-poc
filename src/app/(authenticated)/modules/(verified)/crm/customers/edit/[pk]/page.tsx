import { getCustomer } from "@/app/actions/modules/crm/customers";
import ModuleCRMCustomerDetailHistory from "@/components/modules/crm/customers/detail/history";
import ModuleCRMCustomerEditForm from "@/components/modules/crm/customers/edit/form";
import { ModuleCRMCustomersDetailMenuAction } from "@/components/modules/crm/customers/menu-action";
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

export default async function ModuleCRMCustomersEditPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/crm/customers");
  }

  const {
    data,
    message,
    status
  } = await getCustomer({ pk: pk });

  if (status === "error") {
    return (
      <ModuleError message={message as string} />
    )
  }

  const newCustomerAddress = data?.address?.map((address) => {
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
        title="Edit Customer"
        actions={
          <ModuleCRMCustomersDetailMenuAction
            cid={Number(data?.contact.pk)}
          />
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
            <ModuleCRMCustomerEditForm
              customer={data.contact}
              addresses={newCustomerAddress}
              industries={data.industry}
            />
          </Flex>
          <ModuleCRMCustomerDetailHistory history={data.customer} />
        </Flex>
      )}
    </Flex>
  )
}