"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/uam";
import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Flex } from "@chakra-ui/react";

const tableHeaders = [
  'First Name',
  'Last Name',
  'Email',
  'Group',
  'Last Login At',
  'Created At',
  'Created By'
];

export default function ModuleUAMTableView({
  datas
}: {
  datas: components["schemas"]["User"][];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => {
          const createdBy = data.created_by?.first_name
            ? `${data.created_by.first_name} ${data.created_by.last_name}`
            : 'System';

          return (
            <TR key={index}
              onClick={() => router.push(`/modules/uam/users/detail/${data.pk}`)}
            >
              <TD>
                <Flex align='center' gap={5}>
                  <Avatar
                    name={`${data.first_name} ${data.last_name}`}
                    size={'sm'}
                    rounded={'sm'}
                    src={data.image.url || undefined}
                  />
                  {data.first_name}
                </Flex>
              </TD>
              <TD>{data.last_name}</TD>
              <TD>{data.email}</TD>
              <TD>{data.group?.name}</TD>
              <TD>{formatStandardTime(data.last_login_at || "")}</TD>
              <TD>{formatStandardTime(data.created_at)}</TD>
              <TD>
                <Flex align='center' gap={2}>
                  <Avatar
                    name={createdBy}
                    size={'xs'}
                    rounded={'sm'}
                    src={data.created_by?.image.url || undefined}
                  />
                  {createdBy}
                </Flex>
              </TD>
            </TR>
          )
        })}
      </ITableBody>
    </ITable>
  )
}