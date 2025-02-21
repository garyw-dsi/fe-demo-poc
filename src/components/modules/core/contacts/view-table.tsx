"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/core-services";
import { formatStandardTime } from "@/utils/parsing-time";
import { Flex, Tag } from "@chakra-ui/react";

const tableHeaders = [
  'Contact Name',
  'Legal Type',
  'Tax ID',
  'Tags',
  'Status',
  'Created At',
];

export default function ModuleContactsTableView({
  datas
}: {
  datas: components["schemas"]["Contact"][];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => (
          <TR key={index}
            onClick={() => router.push(`/modules/core/contacts/detail/${data.pk}`)}
          >
            <TD>{data.name}</TD>
            <TD>{data.legal_type}</TD>
            <TD>{data.tax_id}</TD>
            <TD>
              <Flex align={'center'} gap={1}>
                {data.tags.map((tag, index) => (
                  <Tag key={index}
                    size={'sm'}
                    colorScheme="teal"
                    fontSize={'xs'}
                  >
                    {tag.name}
                  </Tag>
                ))}
              </Flex>
            </TD>
            <TD>
              <Tag
                size={'sm'}
                colorScheme={data.deleted_at ? 'red' : 'green'}
                w={'fit-content'}
              >
                {data.deleted_at ? 'Archived' : 'Active'}
              </Tag>
            </TD>
            <TD>{formatStandardTime(data.created_at)}</TD>
          </TR>
        ))}
      </ITableBody>
    </ITable>
  )
}