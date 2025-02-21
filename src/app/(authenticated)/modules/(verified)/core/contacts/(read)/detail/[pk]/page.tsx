import { redirect } from "next/navigation";
import { Flex } from "@chakra-ui/react";
import { getContact } from "@/app/actions/modules/core/contacts";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import { ModuleContactsDetailMenuAction } from "@/components/modules/core/contacts/menu-action";
import ModuleContactDetailHistory from "@/components/modules/core/contacts/detail/history";
import ModuleContactDataDetail from "@/components/modules/core/contacts/detail/contact-data";
import ModuleContactAddressDetail from "@/components/modules/core/contacts/detail/contact-address";
import ModuleContactIndustryDetail from "@/components/modules/core/contacts/detail/contact-industry";
import ModuleContactDetailTabs from "@/components/modules/core/contacts/detail/tab";
import ModuleContactAccountingDetail from "@/components/modules/core/contacts/detail/contact-accounting";
import { faker } from "@faker-js/faker";
import ModuleContactArchived from "@/components/modules/core/contacts/detail/contact-archive";

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

export default async function ModuleContactsDetailPage({
  params
}: PageProps) {
  const pk = Number(params.pk)

  if (!pk) {
    redirect("/modules/core/contacts")
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

  return (
    <Flex
      w={'full'}
      direction={'column'}
      p={5}
      gap={5}
      flex={1}
    >
      <MainModuleHeader
        title="Detail Contact"
        actions={
          <ModuleContactsDetailMenuAction />
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
              contact={data.contact}
              action={<ModuleContactArchived contact={data.contact} />}
            />
            <ModuleContactDetailTabs
              address={<ModuleContactAddressDetail addresses={data.address} />}
              industry={<ModuleContactIndustryDetail industries={data.industry} />}
              accounting={<ModuleContactAccountingDetail accounting={accounting} />}
            />
          </Flex>
          <ModuleContactDetailHistory history={data.contact} />
        </Flex>
      )}
    </Flex>
  )
}