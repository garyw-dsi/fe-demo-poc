import { Fragment, useRef } from "react";
import { FormControl, Stack, Button, Icon, Flex, InputGroup, InputLeftElement, useColorModeValue, Text, Divider, IconButton, Tag } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Field, useFormikContext, FieldArray, getIn } from "formik";

import { type CreateCustomer } from "@/libs/yup/crm/customers";
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input";
import { addressTypes } from "@/constants/modules/crm";

import ModuleCRMCustomerFormLayout from "@/components/modules/crm/customers/layout";
import { initialAddressValue } from "@/components/modules/crm/customers/create/form";
import countryPhoneCodes from "@/constants/country-phone-code.json";

interface AddressFieldsProps {
  index: number;
  remove: (index: number) => void;
  hasMultipleAddresses: boolean;
}

const AddressFields = ({
  index,
  remove,
  hasMultipleAddresses
}: AddressFieldsProps) => {
  const {
    errors,
    touched,
    values
  } = useFormikContext<CreateCustomer>();

  const bgSelectCountryPhone = useColorModeValue('white', 'gray.700');

  return (
    <Stack
      w={'full'}
      spacing={4}
      divider={<Divider />}
    >
      <Flex justify={'space-between'} align={'center'}>
        <Flex align={'center'} gap={5}>
          {hasMultipleAddresses && (
            <IconButton
              aria-label="Remove Address"
              icon={<Icon as={FaTrash} boxSize={3} />}
              size={'xs'}
              colorScheme="red"
              onClick={() => remove(index)}
            />
          )}
          <Text fontSize={'sm'} fontWeight={'bold'}>
            Address {index + 1}
          </Text>
        </Flex>
        {values.address?.[index]?.address_type && (
          <Tag fontSize={'xs'} colorScheme="teal">
            {values.address?.[index]?.address_type}
          </Tag>
        )}
      </Flex>
      <Stack spacing={4}>
        <FormControl
          isRequired
          isInvalid={
            !!getIn(errors, `address.${index}.address_type`) &&
            !!getIn(touched, `address.${index}.address_type`)
          }
        >
          <ModuleInputLabel label="Address Type" />
          <Field
            as={ModuleInputSelect}
            name={`address.${index}.address_type`}
            placeholder="Select Address Type"
          >
            {addressTypes.map((type, typeIndex) => (
              <option key={typeIndex}
                value={type.values}
                disabled={values.address?.some((address, addressIndex) => (
                  addressIndex !== index &&
                  address.address_type === type.values
                ))}
              >
                {type.values}
              </option>
            ))}
          </Field>
          <ModuleInputErrorMessage
            value={getIn(errors, `address.${index}.address_type`)}
          />
        </FormControl>
        {values.address?.[index]?.address_type && (
          <Fragment>
            <FormControl
              isRequired
              isInvalid={
                !!getIn(errors, `address.${index}.address`) &&
                !!getIn(touched, `address.${index}.address`)
              }
            >
              <ModuleInputLabel label="Customer Address" />
              <Field
                as={ModuleInput}
                name={`address.${index}.address`}
                placeholder="Customer Address"
              />
              <ModuleInputErrorMessage
                value={getIn(errors, `address.${index}.address`)}
              />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                !!getIn(errors, `address.${index}.name`) &&
                !!getIn(touched, `address.${index}.name`)
              }
            >
              <ModuleInputLabel label="Customer Name" />
              <Field
                as={ModuleInput}
                name={`address.${index}.name`}
                placeholder="Customer Name"
              />
              <ModuleInputErrorMessage
                value={getIn(errors, `address.${index}.name`)}
              />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                !!getIn(errors, `address.${index}.phone`) &&
                !!getIn(touched, `address.${index}.phone`)
              }
            >
              <ModuleInputLabel label="Customer Phone" />
              <InputGroup>
                <InputLeftElement w={{ base: 24, lg: 48 }}>
                  <Field as={ModuleInputSelect}
                    name={`address.${index}.phone_code`}
                    w={'fit-content'}
                    roundedRight={'none'}
                    bg={bgSelectCountryPhone}
                  >
                    {countryPhoneCodes.map((country, countryIndex) => (
                      <option key={countryIndex} value={country.dial_code}>
                        {country.dial_code} ({country.name})
                      </option>
                    ))}
                  </Field>
                </InputLeftElement>
                <Field
                  as={ModuleInput}
                  type={"number"}
                  name={`address.${index}.phone`}
                  placeholder="Phone Number"
                  pl={{ base: 28, lg: 52 }}
                />
              </InputGroup>
              <ModuleInputErrorMessage
                value={getIn(errors, `address.${index}.phone`)}
              />
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                !!getIn(errors, `address.${index}.email`) &&
                !!getIn(touched, `address.${index}.email`)
              }
            >
              <ModuleInputLabel label="Customer Email" />
              <Field
                as={ModuleInput}
                name={`address.${index}.email`}
                placeholder="Customer Email"
              />
              <ModuleInputErrorMessage
                value={getIn(errors, `address.${index}.email`)}
              />
            </FormControl>
          </Fragment>
        )}
      </Stack>
    </Stack>
  )
}

export default function ModuleCRMCustomerAddressForm() {
  const addAddressRef = useRef<HTMLButtonElement>(null);
  const { values } = useFormikContext<CreateCustomer>();

  const onAddAddress = () => {
    addAddressRef.current?.click();
  }

  return (
    <ModuleCRMCustomerFormLayout
      title="Customer Address"
      action={
        values.address &&
          values.address.length < addressTypes.length
          ? (
            <Button
              size="sm"
              fontSize="xs"
              leftIcon={<Icon as={FaPlus} />}
              isDisabled={values.address.length === addressTypes.length}
              onClick={onAddAddress}
            >
              Add New Address
            </Button>
          )
          : null
      }
    >
      <FieldArray name="address">
        {({ push, remove }) => (
          <Stack spacing={5} divider={<Divider />}>
            {values?.address?.map((_, index) => (
              <AddressFields key={index}
                index={index}
                remove={remove}
                hasMultipleAddresses={true}
              />
            ))}
            <Button
              display="none"
              ref={addAddressRef}
              onClick={() => push(initialAddressValue)}
            />
          </Stack>
        )}
      </FieldArray>
    </ModuleCRMCustomerFormLayout>
  )
}