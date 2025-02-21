"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ModulesSearch from "@/components/modules/search";

interface SearchParams {
  q: string;
}

/**
 * PARAM_SEARCH is the key for the search parameter in the URL
 * it means search leads by its name
 * @constant PARAM_SEARCH
 * @type {string}
 * @default 'name'
 */
const PARAM_SEARCH = 'name';

export default function ModuleCRMLeadsSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [search, setSearch] = useState<SearchParams>({
    q: params.get(PARAM_SEARCH) || '',
  })

  const onFillSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch({
      ...search,
      q: value,
    })
  }

  const onSearch = () => {
    const param = new URLSearchParams(params);
    param.set(PARAM_SEARCH, search.q);
    router.push(`${pathname}?${param.toString()}`);
  }

  const onClearSearch = () => {
    const param = new URLSearchParams(params);
    setSearch({ q: "" });

    param.delete(PARAM_SEARCH);
    router.push(`${pathname}?${param.toString()}`);
  }

  return (
    <ModulesSearch
      onClearSearch={onClearSearch}
      onFillSearch={onFillSearch}
      onSearch={onSearch}
      value={search.q}
      placeholder="Search by opportunity name"
    />
  )
}
