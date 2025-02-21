"use client"

import { Stack } from "@chakra-ui/react";
import { components } from "@/libs/api/schema/inventory";
import ModuleInventoryProductInformationDetail from "./product-information";
import ModuleInventoryProductAccountDetail from "./account-information";

export default function ModuleInventoryProductDetail({
  data
}: {
  data: components['schemas']['Product']
}) {
  return (
    <Stack spacing={5}>
      <ModuleInventoryProductInformationDetail data={data} />
      <ModuleInventoryProductAccountDetail data={data} />
    </Stack>
  )
}