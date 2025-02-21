"use client";

import { useRouter } from "next/navigation";
import ITable, { TD, TR } from "@/components/table";
import ITableBody from "@/components/table/body";
import ITableHeader from "@/components/table/header";
import { components } from "@/libs/api/schema/uam";
// import { formatStandardTime } from "@/utils/parsing-time";
import { Avatar, Flex, Tag } from "@chakra-ui/react";

const tableHeaders = [
  'First Name',
  'Last Name',
  'Email',
  'Department',
  // 'Created At',
  // 'Created By',
  'Status'
];

export default function ModuleHREmployeesTableView({
  datas
}: {
  datas: components["schemas"]["User"][];
}) {
  const router = useRouter();

  const getEmploymentStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return 'blue';
      case "Running":
        return 'green';
      case "Terminated":
        return 'red';
      case "Extended":
        return 'yellow';
      default:
        return 'gray';
    }
  };

  return (
    <ITable>
      <ITableHeader headers={tableHeaders} />
      <ITableBody>
        {datas.map((data, index) => {
          // const createdBy = data.created_by?.first_name
          //   ? `${data.created_by.first_name} ${data.created_by.last_name}`
          //   : 'System';

          return (
            <TR key={index}
              onClick={() => router.push(`/modules/hr/employees/detail/${data.pk}`)}
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
              {/* <TD>{formatStandardTime(data.created_at)}</TD>
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
              </TD> */}
              <TD>
                <Tag
                  colorScheme={getEmploymentStatusColor(data.employment_status)}
                  variant="solid"
                  w={'fit-content'}
                >
                  {data.employment_status}
                </Tag>
              </TD>
            </TR>
          )
        })}
      </ITableBody>
    </ITable>
  )
}