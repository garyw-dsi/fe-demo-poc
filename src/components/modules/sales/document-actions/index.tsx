"use client"

import { Flex } from "@chakra-ui/react";
import ModuleSalesApproveAction from "./approve";
import ModuleSalesCancelAction from "./cancel";

type Modules = "quotation" | "invoice" | "order"

interface Props {
  approveable: boolean;
  module: Modules;
  cancelable: boolean;
}

export default function ModuleSalesDocumentAction({
  approveable,
  module,
  cancelable,
}: Props) {
  return (
    <Flex gap={3} align={'center'}>
      {approveable && (
        <ModuleSalesApproveAction
          module={module}
          w={{ base: "full", md: "fit-content" }}
        />
      )}
      {cancelable && (
        <ModuleSalesCancelAction
          module={module}
          w={{ base: "full", md: "fit-content" }}
        />
      )}
    </Flex>
  )
}