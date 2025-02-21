"use client"

import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { useFormikContext } from "formik";

import { salesStatus } from "@/constants/modules/sales";
import { type CreateOrder } from "@/libs/yup/purchase/orders";

export default function ModulePurchaseOrderCreateStatus() {
  const { values, setFieldValue, setTouched } = useFormikContext<CreateOrder>();

  return (
    <Flex justify={'end'} gap={5} flexWrap={'wrap-reverse'}>
      <ButtonGroup isAttached size={'sm'} variant={'solid'}>
        {salesStatus.map((status, index) => {
          return (
            <Button
              key={index}
              fontSize="xs"
              colorScheme={values.status === status ? "teal" : "gray"}
              cursor={'pointer'}
              onClick={() => {
                setFieldValue("status", status);
                setTouched({ status: true });
              }}
            >
              {status}
            </Button>
          )
        })}
      </ButtonGroup>
    </Flex>
  )
}