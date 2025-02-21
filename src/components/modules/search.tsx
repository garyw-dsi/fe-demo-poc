"use client";

import { useMemo } from "react";
import { Flex, Input, useColorModeValue, Button, InputGroup, InputRightElement } from "@chakra-ui/react";

interface ModuleUAMSearchProps {
  searchBy?: React.ReactNode;
  onSearch: () => void;
  onFillSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  placeholder: string;
  value: string | undefined;
}

export default function ModulesSearch({
  searchBy,
  onSearch,
  onFillSearch,
  onClearSearch,
  placeholder,
  value,
}: ModuleUAMSearchProps) {
  const bg = useColorModeValue("white", "gray.800");

  const onSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const searchButton = useMemo(() => (
    <InputRightElement width="5.5rem">
      <Button
        h="1.75rem"
        size="sm"
        fontSize="xs"
        onClick={onSearch}
        aria-label="Search"
      >
        Search
      </Button>
    </InputRightElement>
  ), [onSearch]);

  const clearButton = useMemo(() =>
    value
      ? (
        <Button
          fontSize="xs"
          onClick={onClearSearch}
          variant="ghost"
          colorScheme="red"
          aria-label="Clear search"
        >
          Clear
        </Button>
      )
      : null,
    [value, onClearSearch]);

  return (
    <Flex
      rounded="md"
      maxW={{ base: 'full', md: "2xl" }}
      w={{ base: 'full', md: "2xl" }}
      gap={3}
    >
      {searchBy}
      <InputGroup size="md">
        <Input
          value={value}
          fontSize={{ base: "sm", md: "xs" }}
          w="full"
          pr="5.5rem"
          bg={bg}
          placeholder={placeholder}
          onChange={onFillSearch}
          onKeyDown={onSearchEnter}
          aria-label={placeholder}
        />
        {searchButton}
      </InputGroup>
      {clearButton}
    </Flex>
  )
}
