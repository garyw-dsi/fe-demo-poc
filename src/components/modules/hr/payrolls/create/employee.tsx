"use client";

import { Fragment, useRef } from "react";
import { FieldArray, useFormikContext } from "formik";
import { Button, Tr, Td, Icon } from "@chakra-ui/react";
import ModuleHRPayrollFormLayout from "../layout";
import ITableHeader from "@/components/table/header";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import ITable from "@/components/table";
import ITableBody from "@/components/table/body";
import { CreatePayroll } from "@/libs/yup/hr/payrolls";
import ModuleHREmployeeSelect from "../../employees/select";

const header: string[] = ["Line", "Employee", ""];

export default function ModuleHRPayrollEmployeeCreate() {
  // const toast = useToast();

  const addEmployeesRef = useRef<() => void>(() => { })
  const { values } = useFormikContext<CreatePayroll>();

  return (
    <ModuleHRPayrollFormLayout
      title="Employee List"
      action={
        <Button
          size="sm"
          fontSize="xs"
          colorScheme="blue"
          leftIcon={
            <Icon as={FaPlus} />
          }
          onClick={() => addEmployeesRef.current()}
        >
          Add Employee
        </Button>
      }
    >
      <FieldArray name="employees">
        {({ push, remove }) => {
          addEmployeesRef.current = () => {
            push({
              employee_id: NaN,
            });
          };

          return (
            <Fragment>
              {values.employees.length > 0 && (
                <ITable variant={'simple'}>
                  <ITableHeader headers={header} />
                  <ITableBody>
                    {values.employees.map((_, index) => (
                      <Tr key={index}>
                        <Td w={8}>
                          {index + 1}
                        </Td>
                        <Td w={{ base: 'xl', lg: "lg" }}>
                          <ModuleHREmployeeSelect
                            fieldName={`employees.${index}.employee_id`}
                            placeholder="Select Employee"
                          />
                        </Td>
                        {values.employees.length > 1 && (
                          <Td>
                            <Button
                              size="xs"
                              colorScheme="red"
                              variant="outline"
                              p={0}
                              onClick={() => remove(index)}
                            >
                              <Icon as={FaTrashAlt} boxSize={3} />
                            </Button>
                          </Td>
                        )}
                      </Tr>
                    ))}
                  </ITableBody>
                </ITable>
              )}
            </Fragment>
          )
        }}
      </FieldArray>
    </ModuleHRPayrollFormLayout>
  )
}