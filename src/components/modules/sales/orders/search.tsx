"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ModulesSearch from "@/components/modules/search";

interface SearchParams {
  orderId: string;
}

export default function ModuleSalesOrderSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [search, setSearch] = useState<SearchParams>({
    orderId: params.get('order_id') || '',
  })

  const onFillSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch({
      ...search,
      orderId: value,
    })
  }

  const onSearch = () => {
    const param = new URLSearchParams(params);
    param.set('order_id', search.orderId);
    router.push(`${pathname}?${param.toString()}`);
  }

  const onClearSearch = () => {
    const param = new URLSearchParams(params);
    setSearch({ orderId: "" });

    param.delete('order_id');
    router.push(`${pathname}?${param.toString()}`);
  }

  return (
    <ModulesSearch
      onClearSearch={onClearSearch}
      onFillSearch={onFillSearch}
      onSearch={onSearch}
      value={search.orderId}
      placeholder="Search by Order Id"
    />
  )
}
