"use client";

import { Button, Flex, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuList, Radio, RadioGroup, Stack, useColorModeValue } from "@chakra-ui/react";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
// need for changes VVVV
import { structureType } from "@/constants/modules/hr/salary-structure";

const PARAMETER_FILTERS = {
  name: "name",
};

export default function ModuleHRDepartmentFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialName = params.get(PARAMETER_FILTERS.name);

  const [name, setName] = useState<string | null>(initialName);

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


  const handleNameChange = (value: string): void => {
    setName(value);
    updateQueryParams(PARAMETER_FILTERS.name, value);
  };

  const clearFilters = (): void => {
    setName(null);

    const newParams = new URLSearchParams(params);
    newParams.delete(PARAMETER_FILTERS.name);

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
            <MenuGroup title="Department Filters">
              <RadioGroup
                value={name || ""}
                onChange={handleNameChange}
              >
                <Stack px={5} spacing={2}>
                  {/* // need for changes VVVV */}
                  {structureType.map((structure, index) => (
                    <Radio key={index} value={structure} size="sm">
                      {structure}
                    </Radio>
                    // need for changes ^^^^
                  ))}
                </Stack>
              </RadioGroup>
            </MenuGroup>
          </Stack>
        </Flex>

        {(name) && (
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
