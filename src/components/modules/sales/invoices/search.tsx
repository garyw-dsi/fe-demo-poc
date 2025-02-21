"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ModulesSearch from "@/components/modules/search";

interface SearchParams {
  invoiceId: string;
}

export default function ModuleSalesInvoiceSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [search, setSearch] = useState<SearchParams>({
    invoiceId: params.get('invoice_id') || '',
  })

  const onFillSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch({
      ...search,
      invoiceId: value,
    })
  }

  const onSearch = () => {
    const param = new URLSearchParams(params);
    param.set('invoice_id', search.invoiceId);
    router.push(`${pathname}?${param.toString()}`);
  }

  const onClearSearch = () => {
    const param = new URLSearchParams(params);
    setSearch({ invoiceId: "" });

    param.delete('invoice_id');
    router.push(`${pathname}?${param.toString()}`);
  }

  return (
    <ModulesSearch
      onClearSearch={onClearSearch}
      onFillSearch={onFillSearch}
      onSearch={onSearch}
      value={search.invoiceId}
      placeholder="Search by Invoice Id"
    />
  )
}
