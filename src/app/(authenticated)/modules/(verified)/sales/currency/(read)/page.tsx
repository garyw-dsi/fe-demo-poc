import { Flex } from "@chakra-ui/react";
import { getAllCurrency } from "@/app/actions/modules/core/currency";

import ModuleCurrencyTableView from "@/components/modules/core/currency/view-table";
import ModuleError from "@/components/modules/error";
import MainModuleHeader from "@/components/modules/main/header";
import Pagination from "@/components/pagination";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: {
    page: string;
    page_size: string;
    name: string;
    iso: string;
    country_id: string;
    symbol: string;
  }
}

export default async function ModuleReadCurrencyPage({
  searchParams
}: PageProps) {
  const page = Number(searchParams.page) || 1;
  const page_size = Number(searchParams.page_size) || 10;
  const name = searchParams.name || undefined;
  const iso = searchParams.iso || undefined;
  const country_id = Number(searchParams.country_id) || 0;
  const symbol = searchParams.symbol || undefined;

  const { data, message, status } = await getAllCurrency({
    page: page,
    page_size: page_size,
    country_id: country_id,
    iso: iso,
    name: name,
    symbol: symbol
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
        title="Currency Managements"
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
            <ModuleCurrencyTableView datas={data.items} />
          </Flex>
          <Pagination totalPages={data.total_page as number} />
        </Flex>
      )}
    </Flex>
  )
}