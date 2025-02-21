import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { getCustomer } from "@/app/actions/modules/crm/customers";

import { ModuleCRMCustomersDetailMenuAction } from "@/components/modules/crm/customers/menu-action";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import ModuleCRMCustomerDetailHistory from "@/components/modules/crm/customers/detail/history";
import ModuleContactDataDetail from "@/components/modules/core/contacts/detail/contact-data";
import ModuleContactIndustryDetail from "@/components/modules/core/contacts/detail/contact-industry";
import ModuleContactAddressDetail from "@/components/modules/core/contacts/detail/contact-address";
import ModuleContactDetailTabs from "@/components/modules/core/contacts/detail/tab";
import ModuleContactAccountingDetail from "@/components/modules/core/contacts/detail/contact-accounting";
import { faker } from "@faker-js/faker";
import ModuleContactDetailAction from "@/components/modules/core/contacts/detail/detail-action";

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    pk: string;
  };
}


interface Accounting {
  bank: {
    name: string;
    number: string;
  }[]
}

const accounting: Accounting = {
  bank: Array.from({ length: 5 }, () => ({
    name: faker.helpers.arrayElement(['BCA', 'BNI', 'Mandiri', 'BRI', 'CIMB Niaga']),
    number: faker.finance.accountNumber(),
  })),
};

export default async function ModuleCRMCustomersDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/crm/customers")
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

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Detail Customer"
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
          direction={{ base: "column", lg: "row" }}
          flexWrap={'wrap'}
          gap={10}
        >
          <Flex
            direction={"column"}
            flex={1}
            maxW={{ base: 'full', lg: "55vw" }}
            gap={5}
          >
            <ModuleContactDataDetail
              subModule="Customer"
              contact={data.contact}
              action={<ModuleContactDetailAction contactId={data.contact.pk} />}
            />
            <ModuleContactDetailTabs
              address={<ModuleContactAddressDetail subModule="Customer" addresses={data.address} />}
              industry={<ModuleContactIndustryDetail subModule="Customer" industries={data.industry} />}
              accounting={<ModuleContactAccountingDetail subModule="Customer" accounting={accounting} />}
            />
          </Flex>
          <ModuleCRMCustomerDetailHistory history={data.customer} />
        </Flex>
      )}
    </Flex>
  )
}