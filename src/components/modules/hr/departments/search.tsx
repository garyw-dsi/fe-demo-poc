"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ModulesSearch from "@/components/modules/search";

interface SearchParams {
  employeeName: string;
}

export default function ModuleHRDepartmentSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [search, setSearch] = useState<SearchParams>({
    employeeName: params.get('name') || '',
  })

  const onFillSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch({
      ...search,
      employeeName: value,
    })
  }

  const onSearch = () => {
    const param = new URLSearchParams(params);
    param.set('name', search.employeeName);
    router.push(`${pathname}?${param.toString()}`);
  }

  const onClearSearch = () => {
    const param = new URLSearchParams(params);
    setSearch({ employeeName: "" });

    param.delete('name');
    router.push(`${pathname}?${param.toString()}`);
  }

  return (
    <ModulesSearch
      onClearSearch={onClearSearch}
      onFillSearch={onFillSearch}
      onSearch={onSearch}
      value={search.employeeName}
      placeholder="Search by Employee Name"
    />
  )
}
