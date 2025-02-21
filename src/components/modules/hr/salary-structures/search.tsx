"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ModulesSearch from "@/components/modules/search";

interface SearchParams {
  salaryStructureName: string;
}

export default function ModuleHRSalaryStructureSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [search, setSearch] = useState<SearchParams>({
    salaryStructureName: params.get('name') || '',
  })

  const onFillSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch({
      ...search,
      salaryStructureName: value,
    })
  }

  const onSearch = () => {
    const param = new URLSearchParams(params);
    param.set('name', search.salaryStructureName);
    router.push(`${pathname}?${param.toString()}`);
  }

  const onClearSearch = () => {
    const param = new URLSearchParams(params);
    setSearch({ salaryStructureName: "" });

    param.delete('name');
    router.push(`${pathname}?${param.toString()}`);
  }

  return (
    <ModulesSearch
      onClearSearch={onClearSearch}
      onFillSearch={onFillSearch}
      onSearch={onSearch}
      value={search.salaryStructureName}
      placeholder="Search by Structure Name"
    />
  )
}
