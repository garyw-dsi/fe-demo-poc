"use client"

import { useRef } from "react"
import { Button, Icon, Stack, Flex, FormControl } from "@chakra-ui/react"
import ModuleHREmployeeFormLayout from "../layout"
import { FaPlus, FaTrashAlt } from "react-icons/fa"
import { FieldArray, getIn, useFormikContext } from "formik"
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input"
import { CreateEmployee } from "@/libs/yup/hr/employees"
import { bankNames } from "@/constants/modules/accounting/banks"

export default function ModuleHREmployeeBankCreate() {
  const addBankRef = useRef<() => void>(() => { })
  const { touched, errors, values, handleChange } = useFormikContext<CreateEmployee>()

  return (
    <ModuleHREmployeeFormLayout
      title="Bank Information"
      action={
        <Button
          colorScheme="blue"
          variant={'outline'}
          fontSize={'xs'}
          size={'sm'}
          leftIcon={<Icon as={FaPlus} />}
          onClick={() => addBankRef.current()}
        >
          Add Bank Account
        </Button>
      }
    >
      <FieldArray name="banks">
        {({ push, remove }) => {
          addBankRef.current = () => {
            push({ name: '', number: '' })
          }

          return (
            <Stack spacing={5}>
              {values.banks?.map((_, index) => (
                <Flex key={index} gap={3}>
                  <Button
                    colorScheme="red"
                    fontSize={'xs'}
                    size={'sm'}
                    h={'full'}
                    onClick={() => remove(index)}
                  >
                    <Icon as={FaTrashAlt} />
                  </Button>
                  <FormControl
                    isRequired
                    isInvalid={
                      !!getIn(errors, `banks[${index}].name`) &&
                      getIn(touched, `banks[${index}].name`)
                    }
                  >
                    <ModuleInputLabel label="Bank Name" />
                    <ModuleInputSelect
                      placeholder="Enter Bank Name"
                      name={`banks[${index}].name`}
                      value={values.banks?.[index]?.name}
                      onChange={handleChange}
                    >
                      {bankNames.map((name) => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </ModuleInputSelect>
                    <ModuleInputErrorMessage
                      value={getIn(errors, `banks.${index}.name`)}
                    />
                  </FormControl>

                  <FormControl
                    isRequired
                    isInvalid={
                      !!getIn(errors, `banks[${index}].number`) &&
                      getIn(touched, `banks[${index}].number`)
                    }
                  >
                    <ModuleInputLabel label="Bank Number" />
                    <ModuleInput
                      placeholder="Enter Bank Number"
                      name={`banks[${index}].number`}
                      value={values.banks?.[index]?.number}
                      onChange={handleChange}
                    />
                    <ModuleInputErrorMessage
                      value={getIn(errors, `banks[${index}].number`)}
                    />
                  </FormControl>
                </Flex>
              ))}
            </Stack>
          )
        }}
      </FieldArray>
    </ModuleHREmployeeFormLayout>
  )
}
