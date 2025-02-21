"use client"

import { useRouter } from "next/navigation"
import { Table, TableContainer, Tag, Tbody, useColorModeValue } from "@chakra-ui/react"
import { components } from "@/libs/api/schema/crm"
import { TD, TR } from "@/components/table"
import ITableHeader from "@/components/table/header"

const headers = [
  "Customer Name",
  "Legal Type",
  "Created By"
];

export default function ModuleCRMCustomersFeedTableData({
  datas
}: {
  datas: components["schemas"]["Customer"][] | undefined
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
              onClick={() => router.push(`/modules/crm/customers/detail/${item.pk}`)}
            >
              <TD>{item.contact.name}</TD>
              <TD>{item.contact.legal_type}</TD>
              <TD>
                <Tag size={'sm'}>
                  {`${item.created_by.first_name} ${item.created_by.last_name}`}
                </Tag>
              </TD>
            </TR>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}