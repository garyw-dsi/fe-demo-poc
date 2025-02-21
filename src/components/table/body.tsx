import { Tbody } from "@chakra-ui/react";

export default function ITableBody({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Tbody
      w={"100%"}
      overflow={'auto'}
    >
      {children}
    </Tbody>
  )
}