"use client"

import { components } from "@/libs/api/schema/core-services";
import ModuleContactFormLayout from "@/components/modules/core/contacts/layout";
import { Flex, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";

type subModule = "Contact" | "Customer" | "Vendor";

interface Props {
  subModule?: subModule;
  industries: components['schemas']['Industry'][] | undefined;
}

interface Title {
  subModule: subModule;
  title: string;
}

const titles: Title[] = [
  { subModule: "Contact", title: "Contact Industry" },
  { subModule: "Customer", title: "Customer Industry" },
  { subModule: "Vendor", title: "Vendor Industry" }
];

const DetailLabel = ({ label }: { label: string }) => {
  return (
    <Text
      fontSize={'xs'}
      color={useColorModeValue('gray.500', 'gray.300')}
    >
      {label}
    </Text>
  )
}

const NoDataProvided = () => {
  return (
    <Text
      fontSize={'sm'}
      textAlign={'center'}
      color={useColorModeValue('gray.500', 'gray.400')}
    >
      No Industry Provided
    </Text>
  )
}

/**
 * 
 * @param subModule
 * @param industries
 * 
 * @description
 * This component is used to display the contact industry detail.
 * it will display the contact industry detail based on the subModule.
 * 
 * @example
 * <ModuleContactIndustryDetail subModule="Contact" industries={industries} /> // subModule contact
 * <ModuleContactIndustryDetail subModule="Customer" industries={industries} /> // subModule customer
 * <ModuleContactIndustryDetail subModule="Vendor" industries={industries} /> // subModule vendor
 */
export default function ModuleContactIndustryDetail({
  subModule = "Contact",
  industries
}: Props) {
  return (
    <ModuleContactFormLayout
      title={
        titles
          .find((t) => t.subModule === subModule)?.title || ""
      }
    >
      {(industries && industries.length > 0)
        ? (
          <Stack spacing={2}>
            <DetailLabel
              label={`${subModule} Industry Type`}
            />
            <Flex align={'center'} gap={2} flexWrap={'wrap'}>
              {industries.map((industry, index) => (
                <Tag key={index} size={'sm'} variant="solid" colorScheme="yellow">
                  {industry.industry_type}
                </Tag>
              ))}
            </Flex>
          </Stack>
        )
        : <NoDataProvided />
      }
    </ModuleContactFormLayout>
  )
}
