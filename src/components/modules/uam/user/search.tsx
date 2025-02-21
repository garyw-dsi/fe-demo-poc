"use client"

import { useState, useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Select, useColorModeValue } from "@chakra-ui/react";
import ModulesSearch from "@/components/modules/search";

interface SearchFilter {
  first_name?: string;
  last_name?: string;
  email?: string;
}

const searchFilterOptions = [
  { value: 'first_name', label: 'First Name' },
  { value: 'last_name', label: 'Last Name' },
  { value: 'email', label: 'Email' }
] as const;

export default function ModuleUAMUserSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [search, setSearch] = useState<SearchFilter>({
    first_name: params.get('first_name') || '',
    last_name: params.get('last_name') || '',
    email: params.get('email') || '',
  });

  const [filter, setFilter] = useState<keyof SearchFilter>(
    (params.get('filter') as keyof SearchFilter) || 'first_name'
  );

  const bg = useColorModeValue('white', 'gray.800');

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFilter(value as keyof SearchFilter);
  }, []);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch((prev) => ({
      ...prev,
      [filter]: value,
    }));
  }, [filter]);

  const updateURLParams = useCallback(() => {
    const param = new URLSearchParams(params);

    param.delete('first_name');
    param.delete('last_name');
    param.delete('email');
    param.delete('filter');

    if (search[filter]) {
      param.set('filter', filter);
      param.set(filter, search[filter] as string);
    }

    return param;
  }, [params, filter, search]);

  const handleSearch = useCallback(() => {
    const param = updateURLParams();
    router.push(`${pathname}?${param.toString()}`);
  }, [pathname, router, updateURLParams]);

  const handleClearSearch = useCallback(() => {
    const param = new URLSearchParams(params);

    setSearch({
      first_name: '',
      last_name: '',
      email: '',
    });

    param.delete('filter');
    param.delete('first_name');
    param.delete('last_name');
    param.delete('email');

    router.push(`${pathname}?${param.toString()}`);
  }, [params, router, pathname]);

  const searchFilters = useMemo(() => (
    searchFilterOptions.map((filter) => (
      <option key={filter.value} value={filter.value}>
        {filter.label}
      </option>
    ))
  ), []);

  return (
    <ModulesSearch
      searchBy={
        <Select
          name="filter"
          value={filter}
          onChange={handleFilterChange}
          w={{ base: 'fit-content', md: 'xs' }}
          bg={bg}
          fontSize={{ base: 'xs', md: 'xs' }}
        >
          {searchFilters}
        </Select>
      }
      onFillSearch={handleSearchInputChange}
      onClearSearch={handleClearSearch}
      value={search[filter] as string}
      onSearch={handleSearch}
      placeholder={`Search by ${filter.replace('_', ' ')}`}
    />
  )
}
