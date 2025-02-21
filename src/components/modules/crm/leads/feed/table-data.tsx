"use client"

import { useRouter } from "next/navigation"
import { Table, TableContainer, Tag, Tbody, useColorModeValue } from "@chakra-ui/react"
import { components } from "@/libs/api/schema/crm"
import { TD, TR } from "@/components/table"
import ITableHeader from "@/components/table/header"

const headers = [
  "Customer Name",
  "Opportunity Name",
  "Stage"
];

export default function ModuleCRMLeadsFeedTableData({
  datas
}: {
  datas: components["schemas"]["Lead"][] | undefined
}) {
  const router = useRouter();
  const bgHover = useColorModeValue('gray.100', 'gray.800');

  return (
    <TableContainer overflow={'auto'}>
      <Table size={'sm'}>
        <ITableHeader headers={headers} />
        <Tbody>
          {datas?.map((item) => (
            <TR key={item.pk}
              _hover={{ bg: bgHover }}
              onClick={() => router.push(`/modules/crm/leads/detail/${item.pk}`)}
            >
              <TD>{item.customer_name}</TD>
              <TD>{item.name}</TD>
              <TD>
                <Tag size={'sm'}>
                  {item.lead_status}
                </Tag>
              </TD>
            </TR>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}