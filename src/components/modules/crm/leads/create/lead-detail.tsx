"use client"

import { Flex, FormControl, InputGroup, InputLeftElement, Stack, useColorModeValue } from "@chakra-ui/react"
import ModuleCRMLeadsFormLayout from "../layout"
import { ModuleInput, ModuleInputErrorMessage, ModuleInputLabel, ModuleInputSelect } from "@/components/modules/input"
import { Field, useFormikContext } from "formik"
import { CreateLead } from "@/libs/yup/crm/leads"
import countryPhoneCodes from "@/constants/country-phone-code.json";

export default function ModuleCRMLeadDetailCreate() {
  const { errors, touched } = useFormikContext<CreateLead>();
  const bgSelectCountryPhone = useColorModeValue('white', 'gray.700');

  return (
    <ModuleCRMLeadsFormLayout
      title="Lead Detail"
    >
      <Stack spacing={5}>
        <Flex gap={5} direction={{ base: 'column', lg: 'row' }}>
          <FormControl
            isInvalid={!!errors.customer_name && touched.customer_name}
          >
            <ModuleInputLabel label="Contact Name" />
            <Field as={ModuleInput} name="contact_name" placeholder="Contact Name" />
            <ModuleInputErrorMessage value={errors.contact_name} />
          </FormControl>
          <FormControl
            isInvalid={!!errors.email && touched.email}
          >
            <ModuleInputLabel label="Email Address" />
            <Field as={ModuleInput} type="email" name="email" placeholder="your@mail.com" />
            <ModuleInputErrorMessage value={errors.email} />
          </FormControl>
        </Flex>

        <Flex gap={5} direction={{ base: 'column', lg: 'row' }}>
          <FormControl
            isInvalid={!!errors.phone && touched.phone}
          >
            <ModuleInputLabel label="Customer Phone" />
            <InputGroup>
              <InputLeftElement w={{ base: 24, lg: 48 }}>
                <Field as={ModuleInputSelect}
                  name={'phone_code'}
                  w={'fit-content'}
                  roundedRight={'none'}
                  bg={bgSelectCountryPhone}
                >
                  {countryPhoneCodes.map((country, countryIndex) => (
                    <option key={countryIndex}
                      value={country.dial_code}
                    >
                      {country.dial_code} ({country.name})
                    </option>
                  ))}
                </Field>
              </InputLeftElement>
              <Field
                as={ModuleInput}
                type={"number"}
                name={'phone'}
                placeholder="Phone Number"
                pl={{ base: 28, lg: 52 }}
              />
            </InputGroup>
            <ModuleInputErrorMessage value={errors.phone} />
          </FormControl>
          <FormControl
            isInvalid={!!errors.address && touched.address}
          >
            <ModuleInputLabel label="Address" />
            <Field as={ModuleInput} name="address" placeholder="Address" />
            <ModuleInputErrorMessage value={errors.address} />
          </FormControl>
        </Flex>
      </Stack>
    </ModuleCRMLeadsFormLayout>
  )
}