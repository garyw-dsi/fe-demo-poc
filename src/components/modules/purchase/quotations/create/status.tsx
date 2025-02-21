"use client"

import { useFormikContext } from "formik";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { salesStatus } from "@/constants/modules/sales";
import { CreateQuotation } from "@/libs/yup/purchase/quotations";

export default function ModulePurchaseQuotationCreateStatus() {
  const { values, setFieldValue, setTouched } = useFormikContext<CreateQuotation>();

  return (
    <Flex justify={'end'} gap={5} flexWrap={'wrap-reverse'}>
      <ButtonGroup isAttached size={'sm'} variant={'solid'}>
        {salesStatus.map((status, index) => {
          return (
            <Button
              key={index}
              fontSize="xs"
              colorScheme={values.status === status ? "teal" : "gray"}
              cursor={'default'}
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