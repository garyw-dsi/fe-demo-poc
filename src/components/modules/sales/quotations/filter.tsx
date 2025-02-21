"use client";

import { Button, Flex, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuList, Radio, RadioGroup, Stack, useColorModeValue } from "@chakra-ui/react";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { deliveryTerms, paymentTerms, quotationStatus } from "@/constants/modules/sales";

const PARAMETER_FILTERS = {
  deliveryTerm: "delivery_term",
  status: "status",
  paymentTerm: "payment_term"
};

export default function ModuleSalesQuotationFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialDeliveryTerm = params.get(PARAMETER_FILTERS.deliveryTerm);
  const initialStatus = params.get(PARAMETER_FILTERS.status);

  const [deliveryTerm, setDeliveryTerm] = useState<string | null>(initialDeliveryTerm);
  const [paymentTerm, setPaymentTerm] = useState<string | null>(initialDeliveryTerm);
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

  const handleDeliveryTermChange = (value: string): void => {
    setDeliveryTerm(value);
    updateQueryParams(PARAMETER_FILTERS.deliveryTerm, value);
  };

  const handleStatusChange = (value: string): void => {
    setStatus(value);
    updateQueryParams(PARAMETER_FILTERS.status, value);
  };

  const handlePaymentTermChange = (value: string): void => {
    setPaymentTerm(value);
    updateQueryParams(PARAMETER_FILTERS.paymentTerm, value);
  }

  const clearFilters = (): void => {
    setDeliveryTerm(null);
    setStatus(null);

    const newParams = new URLSearchParams(params);
    newParams.delete(PARAMETER_FILTERS.deliveryTerm);
    newParams.delete(PARAMETER_FILTERS.status);
    newParams.delete(PARAMETER_FILTERS.paymentTerm);

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
          <MenuGroup title="Delivery Term">
            <RadioGroup
              value={deliveryTerm || ""}
              onChange={handleDeliveryTermChange}
            >
              <Stack px={5} spacing={2}>
                {deliveryTerms.map((term, index) => (
                  <Radio key={index} value={term} size="sm">
                    {term}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </MenuGroup>

          <Stack
            borderLeft="1px"
            borderColor={borderColor}
          >
            <MenuGroup title="Payment Term">
              <RadioGroup
                value={paymentTerm || ""}
                onChange={handlePaymentTermChange}
              >
                <Stack px={5} spacing={2}>
                  {paymentTerms.map((term, index) => (
                    <Radio key={index} value={term} size="sm">
                      {term}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </MenuGroup>
          </Stack>

          <Stack
            borderLeft="1px"
            borderColor={borderColor}
          >
            <MenuGroup title="Quotation Status">
              <RadioGroup
                value={status || ""}
                onChange={handleStatusChange}
              >
                <Stack px={5} spacing={2}>
                  {quotationStatus.map((quotation, index) => (
                    <Radio key={index} value={quotation} size="sm">
                      {quotation}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </MenuGroup>
          </Stack>
        </Flex>

        {(deliveryTerm || status || paymentTerm) && (
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
