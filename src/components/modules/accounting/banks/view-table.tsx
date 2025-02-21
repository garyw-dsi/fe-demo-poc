"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { Avatar, Flex, Tag } from "@chakra-ui/react";

const tableHeaders = [
  'Bank Name',
  'Account Number',
  'Identifier Code',
];

interface Data {
  pk: number;
  number: string;
  name: string;
  identifier_code: string;
}

export default function ModuleAccountingBanksTableView({
  datas
}: {
  datas: Data[];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => {
          return (
            <TR key={index}
              onClick={() => router.push(`/modules/accounting/banks/detail/${data.pk}`)}
            >
              <TD>
                <Flex align={'center'} gap={2}>
                  <Avatar
                    size={'xs'}
                    rounded={'sm'}
                    name={data.name}
                  />
                  {data.name}
                </Flex>
              </TD>
              <TD>{data.number}</TD>
              <TD>
                <Tag
                  colorScheme={['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'purple'][Math.floor(Math.random() * 7)]}
                  fontSize={'xs'}
                  size={'sm'}
                >
                  {data.identifier_code}
                </Tag>
              </TD>
            </TR>
          )
        })}
      </ITableBody>
    </ITable>
  )
}