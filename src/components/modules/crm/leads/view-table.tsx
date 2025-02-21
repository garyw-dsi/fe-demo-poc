"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/crm";
import { viewFormattedStdPhone } from "@/utils/formatted-std-phone";
import { Tag } from "@chakra-ui/react";

const tableHeaders = [
  'Opportunity Name',
  'Customer Name',
  'Contact Name',
  'Email',
  'Phone',
  'Stage',
  'Created By',
];

export default function ModuleCRMLeadsTableView({
  datas
}: {
  datas: components["schemas"]["Lead"][];
}) {
  const router = useRouter();

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => (
          <TR key={index}
            onClick={() => router.push(`/modules/crm/leads/detail/${data.pk}`)}
          >
            <TD>{data.name}</TD>
            <TD>{data.customer_name}</TD>
            <TD>{data.contact_name}</TD>
            <TD>{data.email}</TD>
            <TD>
              {data.phone && viewFormattedStdPhone(data.phone as string)}
            </TD>
            <TD>
              <Tag size={'sm'}>
                {data.lead_status}
              </Tag>
            </TD>
            <TD>
              {`${data.created_by.first_name} ${data.created_by.last_name}`}
            </TD>
          </TR>
        ))}
      </ITableBody>
    </ITable>
  )
}