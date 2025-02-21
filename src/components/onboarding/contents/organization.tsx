import { Flex, FormControl, FormErrorMessage, FormLabel, Input, Select, Text } from "@chakra-ui/react";
import { Field, useFormikContext } from "formik";
import { Onboarding } from "@/libs/yup/onboarding";
import { legalTypes } from "@/constants/modules/organization";

export default function OnboardingOrganization() {
  const { errors, touched } = useFormikContext<Onboarding>();
  return (
    <Flex
      direction={'column'}
      flex={1}
      gap={6}
      justify={'center'}
      align={'center'}
      maxW={{ base: 'full', md: 'lg' }}
      mx={'auto'}
    >
      <Text fontSize={'lg'} fontWeight={'bold'}>
        Fill out your information
      </Text>

      <FormControl
        isRequired
        isInvalid={!!errors.organization?.legal_name && touched.organization?.legal_name}
      >
        <FormLabel fontSize="sm">Legal Name</FormLabel>
        <Field as={Input} type="text" name="organization.legal_name" fontSize="sm" />
        <FormErrorMessage fontSize="sm">
          {errors.organization?.legal_name}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={!!errors.organization?.legal_type && touched.organization?.legal_type}
      >
        <FormLabel fontSize="sm">Legal Type</FormLabel>
        <Field as={Select} name="organization.legal_type" fontSize="sm">
          {legalTypes.map((type) => (
            <option key={type.values} value={type.values}>
              {type.values}
            </option>
          ))}
        </Field>
        <FormErrorMessage fontSize="sm">
          {errors.organization?.legal_type}
        </FormErrorMessage>
      </FormControl>
    </Flex>
  )
}