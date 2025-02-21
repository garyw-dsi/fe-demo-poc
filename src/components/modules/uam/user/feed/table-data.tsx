"use client"

import { useRouter } from "next/navigation"
import { Table, TableContainer, Tbody, useColorModeValue } from "@chakra-ui/react"
import { components } from "@/libs/api/schema/uam"
import { TD, TR } from "@/components/table"
import ITableHeader from "@/components/table/header"
import { formatStandardTime } from "@/utils/parsing-time"

const headers = [
  "Email",
  "Name",
  "Last Login"
];

export default function ModuleUAMUsersFeedTableData({
  datas
}: {
  datas: components["schemas"]["User"][] | undefined
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
              onClick={() => router.push(`/modules/uam/users/detail/${item.pk}`)}
            >
              <TD>{item.email}</TD>
              <TD>
                {`${item.first_name} ${item.last_name}`}
              </TD>
              <TD>
                {formatStandardTime(item.last_login_at || "")}
              </TD>
            </TR>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}