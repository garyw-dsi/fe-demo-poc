"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { customerLegalTypes } from "@/constants/modules/crm";
import { Button, Flex, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuList, Radio, RadioGroup, Stack, useColorModeValue } from "@chakra-ui/react";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";

const PARAMETER_FILTER = "legal_type";

export default function ModuleCRMCustomersFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [legalType, setLegalType] = useState<string | null>(params.get(PARAMETER_FILTER));

  const handleChange = (value: string) => {
    setLegalType(value);

    const newParams = new URLSearchParams(params);
    newParams.set(PARAMETER_FILTER, value);

    const url = `${pathname}?${newParams.toString()}`;
    router.push(url);
  }

  const onClearFilter = () => {
    setLegalType(null);

    const newParams = new URLSearchParams(params);
    newParams.delete(PARAMETER_FILTER);

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
        borderColor={useColorModeValue("gray.200", "gray.700")}
      />
      <MenuList zIndex={999}>
        <MenuGroup title="Filter Legal Type">
          <RadioGroup
            onChange={handleChange}
            value={legalType || ""}
            pb={4}
          >
            <Stack px={5} spacing={2}>
              {customerLegalTypes.map((legalType, index) => (
                <Radio key={index} value={legalType.values} size="sm">
                  {legalType.values}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        </MenuGroup>
        {legalType && (
          <Flex justify="end" px={3} pb={2}>
            <Button
              size="sm"
              fontSize="xs"
              variant="link"
              colorScheme="red"
              onClick={onClearFilter}
            >
              Clear Filter
            </Button>
          </Flex>
        )}
      </MenuList>
    </Menu>
  )
}
