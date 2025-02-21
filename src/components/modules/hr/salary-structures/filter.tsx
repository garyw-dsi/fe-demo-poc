"use client";

import { Button, Flex, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuList, Radio, RadioGroup, Stack, useColorModeValue } from "@chakra-ui/react";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { structureType } from "@/constants/modules/hr/salary-structure";

const PARAMETER_FILTERS = {
  type: "type",
};

export default function ModuleHRSalaryStrcutureFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialType = params.get(PARAMETER_FILTERS.type);

  const [type, setType] = useState<string | null>(initialType);

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");

  const updateQueryParams = (key: string, value: string | null): void => {
    const newParams = new URLSearchParams(params);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    const url = `${pathname}?${newParams.toString()}`;
    router.push(url);
  };


  const handleTypeChange = (value: string): void => {
    setType(value);
    updateQueryParams(PARAMETER_FILTERS.type, value);
  };

  const clearFilters = (): void => {
    setType(null);

    const newParams = new URLSearchParams(params);
    newParams.delete(PARAMETER_FILTERS.type);

    const url = `${pathname}?${newParams.toString()}`;
    router.push(url);
  };

  return (
    <Menu closeOnSelect={false} isLazy>
      <MenuButton
        as={IconButton}
        size="md"
        icon={<Icon as={VscSettings} boxSize={4} />}
        bg={useColorModeValue("white", "gray.700")}
        border="1px"
        borderColor={borderColor}
      />
      <MenuList zIndex={999} bg={bgColor}>
        <Flex gap={5} pb={4}>
          <Stack>
            <MenuGroup title="Employment Type">
              <RadioGroup
                value={type || ""}
                onChange={handleTypeChange}
              >
                <Stack px={5} spacing={2}>
                  {structureType.map((structure, index) => (
                    <Radio key={index} value={structure} size="sm">
                      {structure}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </MenuGroup>
          </Stack>
        </Flex>

        {(type) && (
          <Flex justify="end" px={3} pb={2}>
            <Button
              size="sm"
              fontSize="xs"
              variant="link"
              colorScheme="red"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </Flex>
        )}
      </MenuList>
    </Menu>
  )
}
