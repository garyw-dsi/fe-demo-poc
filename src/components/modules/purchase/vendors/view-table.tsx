"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/crm";
import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Flex } from "@chakra-ui/react";

const tableHeaders = [
  'Vendor Name',
  'Legal Type',
  'Created At',
];

export default function ModulePurchaseVendorsTableView({
  datas
}: {
  datas: components["schemas"]["Customer"][];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => (
          <TR key={index}
            onClick={() => router.push(`/modules/purchase/vendors/detail/${data.pk}`)}
          >
            <TD>
              <Flex align={'center'} gap={2}>
                <Avatar
                  size={'xs'}
                  rounded={'sm'}
                  src={data.contact.image.url || undefined}
                  name={data.contact.name}
                />
                {data.contact.name}
              </Flex>
            </TD>
            <TD>{data.contact.legal_type}</TD>
            <TD>{formatStandardTime(data.created_at)}</TD>
          </TR>
        ))}
      </ITableBody>
    </ITable>
  )
}