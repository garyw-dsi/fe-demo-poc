"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import ModulesSearch from "@/components/modules/search";

interface SearchParams {
  payrollBatchName: string;
}

export default function ModuleHRPayrollearch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [search, setSearch] = useState<SearchParams>({
    payrollBatchName: params.get('name') || '',
  })

  const onFillSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch({
      ...search,
      payrollBatchName: value,
    })
  }

  const onSearch = () => {
    const param = new URLSearchParams(params);
    param.set('name', search.payrollBatchName);
    router.push(`${pathname}?${param.toString()}`);
  }

  const onClearSearch = () => {
    const param = new URLSearchParams(params);
    setSearch({ payrollBatchName: "" });

    param.delete('name');
    router.push(`${pathname}?${param.toString()}`);
  }

  return (
    <ModulesSearch
      onClearSearch={onClearSearch}
      onFillSearch={onFillSearch}
      onSearch={onSearch}
      value={search.payrollBatchName}
      placeholder="Search by Batch Name"
    />
  )
}
