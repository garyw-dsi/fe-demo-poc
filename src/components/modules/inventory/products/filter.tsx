"use client"

import { Button, Flex, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuList, Radio, RadioGroup, Stack, useColorModeValue } from "@chakra-ui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { VscSettings } from "react-icons/vsc";

export default function ModuleInventoryProductFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const product_type = params.get("product_type");

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(params);
    newParams.set("product_type", value);

    const url = `${pathname}?${newParams.toString()}`;
    router.push(url);
  }

  const onClearFilter = () => {
    const newParams = new URLSearchParams(params);
    newParams.delete("product_type");

    const url = `${pathname}?${newParams.toString()}`;
    router.push(url);
  }

  return (
    <Menu closeOnSelect={false} isLazy>
      <MenuButton
        as={IconButton}
        size={'md'}
        icon={
          <Icon as={VscSettings} boxSize={4} />
        }
        bg={useColorModeValue('white', 'gray.700')}
        border={'1px'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      />
      <MenuList zIndex={999}>
        <MenuGroup title="Filter Product Type">
          <RadioGroup
            onChange={handleChange}
            defaultValue={product_type as string}
          >
            <Stack px={5} spacing={2}>
              <Radio size={'sm'} value="Goods">Goods</Radio>
              <Radio size={'sm'} value="Service">Services</Radio>
            </Stack>
          </RadioGroup>
        </MenuGroup>

        <Flex justify={'end'} px={3} py={1}>
          <Button
            size={'sm'}
            fontSize={'xs'}
            variant={'link'}
            colorScheme="red"
            onClick={onClearFilter}
          >
            Clear Filter
          </Button>
        </Flex>
      </MenuList>
    </Menu>
  )
}