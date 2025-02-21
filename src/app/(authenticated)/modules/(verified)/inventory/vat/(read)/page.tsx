import { Flex } from "@chakra-ui/react";
import { getAllVat } from "@/app/actions/modules/core/vat";

import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";
import ModuleVatTableView from "@/components/modules/core/vat/view-table";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    page: string;
    page_size: string;
    name: string;
    country_id: string;
  }
}

export default async function ModuleReadVATPage({
  searchParams
}: PageProps) {
  const page = Number(searchParams.page) || 1;
  const page_size = Number(searchParams.page_size) || 10;
  const name = searchParams.name || undefined;
  const country_id = Number(searchParams.country_id) || undefined;

  const { data, message, status } = await getAllVat({
    page: page,
    page_size: page_size,
    country_id: country_id,
    name: name,
  });

  if (status === "error") {
    return <ModuleError message={message} />
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
        title="VAT Managements"
        withViewHelper={false}
      />

      {data && (
        <Flex
          w={'full'}
          direction={'column'}
          gap={5}
          flex={1}
        >
          <Flex flex={1} align={'start'}>
            <ModuleVatTableView datas={data.items} />
          </Flex>
          <Pagination totalPages={data.total_page as number} />
        </Flex>
      )}
    </Flex>
  )
}