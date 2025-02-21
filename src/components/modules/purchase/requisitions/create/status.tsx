"use client"

import { useFormikContext } from "formik";
import { Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { salesStatus } from "@/constants/modules/sales";
import { CreateRequisition } from "@/libs/yup/purchase/requisition";

export default function ModulePurchaseRequisitionCreateStatus() {
  const { values, setFieldValue, setTouched } = useFormikContext<CreateRequisition>();

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