"use client";

import { Button, Flex, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuList, Radio, RadioGroup, Stack, useColorModeValue } from "@chakra-ui/react";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { customerLegalTypes } from "@/constants/modules/crm";

const PARAMETER_FILTERS = {
  legalType: "legal_type",
  archived: "archived",
};

export default function ModuleContactsFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialLegalType = params.get(PARAMETER_FILTERS.legalType);
  const initialArchived = params.get(PARAMETER_FILTERS.archived);

  const [legalType, setLegalType] = useState<string | null>(initialLegalType);
  const [archived, setArchived] = useState<string | null>(initialArchived);

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

  const handleLegalTypeChange = (value: string): void => {
    setLegalType(value);
    updateQueryParams(PARAMETER_FILTERS.legalType, value);
  };

  const handleArchivedChange = (value: string): void => {
    setArchived(value);
    updateQueryParams(PARAMETER_FILTERS.archived, value);
  };

  const clearFilters = (): void => {
    setLegalType(null);
    setArchived(null);

    const newParams = new URLSearchParams(params);
    newParams.delete(PARAMETER_FILTERS.legalType);
    newParams.delete(PARAMETER_FILTERS.archived);

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
          <MenuGroup title="Filter Legal Type">
            <RadioGroup
              value={legalType || ""}
              onChange={handleLegalTypeChange}
            >
              <Stack px={5} spacing={2}>
                {customerLegalTypes.map(({ values }, index) => (
                  <Radio key={index} value={values} size="sm">
                    {values}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </MenuGroup>

          <Stack
            borderLeft="1px"
            borderColor={borderColor}
          >
            <MenuGroup title="Contact Status">
              <RadioGroup
                value={archived || ""}
                onChange={handleArchivedChange}
              >
                <Stack px={5} spacing={2}>
                  <Radio value="false" size="sm">
                    Contact Archived
                  </Radio>
                  <Radio value="true" size="sm">
                    Contact Active
                  </Radio>
                </Stack>
              </RadioGroup>
            </MenuGroup>
          </Stack>
        </Flex>

        {(legalType || archived) && (
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
