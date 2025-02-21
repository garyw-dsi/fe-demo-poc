"use client";

import { Button, Flex, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuList, Radio, RadioGroup, Stack, useColorModeValue } from "@chakra-ui/react";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { invoiceStatus } from "@/constants/modules/sales";

const PARAMETER_FILTERS = {
  status: "status",
};

export default function ModuleSalesInvoiceFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialStatus = params.get(PARAMETER_FILTERS.status);

  const [status, setStatus] = useState<string | null>(initialStatus);

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


  const handleStatusChange = (value: string): void => {
    setStatus(value);
    updateQueryParams(PARAMETER_FILTERS.status, value);
  };

  const clearFilters = (): void => {
    setStatus(null);

    const newParams = new URLSearchParams(params);
    newParams.delete(PARAMETER_FILTERS.status);

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
            <MenuGroup title="Invoice Status">
              <RadioGroup
                value={status || ""}
                onChange={handleStatusChange}
              >
                <Stack px={5} spacing={2}>
                  {invoiceStatus.map((invoice, index) => (
                    <Radio key={index} value={invoice} size="sm">
                      {invoice}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </MenuGroup>
          </Stack>
        </Flex>

        {(status) && (
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
