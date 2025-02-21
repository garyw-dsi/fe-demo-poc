"use client"

import { components } from "@/libs/api/schema/core-services";
import ModuleContactFormLayout from "@/components/modules/core/contacts/layout";
import { Avatar, Flex, Stack, Tag, Text, useColorModeValue } from "@chakra-ui/react";

type subModule = "Contact" | "Customer" | "Vendor";

interface Props {
  subModule?: subModule;
  action?: React.ReactNode;
  contact: components['schemas']['Contact'];
}

interface Title {
  subModule: subModule;
  title: string;
}

const titles: Title[] = [
  { subModule: "Contact", title: "Contact Information" },
  { subModule: "Customer", title: "Customer Information" },
  { subModule: "Vendor", title: "Vendor Information" }
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

/**
 * 
 * @param subModule 
 * @param contact
 * 
 * @description 
 * This component is used to display the contact data detail.
 * it will display the contact data detail based on the subModule.
 * 
 * @example
 * <ModuleContactDataDetail subModule="Contact" contact={contact} /> // subModule contact
 * <ModuleContactDataDetail subModule="Customer" contact={contact} /> // subModule customer
 * <ModuleContactDataDetail subModule="Vendor" contact={contact} /> // subModule vendor
 */
export default function ModuleContactDataDetail({
  subModule = "Contact",
  action,
  contact
}: Props) {
  return (
    <ModuleContactFormLayout
      title={
        titles
          .find((t) => t.subModule === subModule)?.title || ""
      }
      action={action}
    >
      <Stack spacing={5}>
        <Flex
          gap={5}
          direction={{ base: 'column', lg: 'row' }}
        >
          <Avatar
            src={contact.image.url || undefined}
            size={'xl'}
            name={contact.name}
            rounded={'md'}
          />

          <Flex direction={'column'} gap={5} w={'full'}>
            <Stack spacing={0}>
              <DetailLabel
                label={`${subModule} Name`}
              />
              <Text fontWeight={'bold'} fontSize={{ base: 'sm', md: "md" }}>
                {contact.name}
              </Text>
            </Stack>
            {contact.tags.length > 0 && (
              <Stack spacing={2}>
                <DetailLabel label="Tags" />
                <Flex align={'center'} gap={2} flexWrap={'wrap'}>
                  {contact.tags.map((tag, index) => (
                    <Tag key={index} size={'sm'} variant="solid" colorScheme="teal">
                      {tag.name}
                    </Tag>
                  ))}
                </Flex>
              </Stack>
            )}
          </Flex>
          <Flex direction={'column'} gap={5} w={'full'}>
            <Stack spacing={0}>
              <DetailLabel
                label={`${subModule} Legal Type`}
              />
              <Text fontWeight={'bold'} fontSize={{ base: 'sm', md: "md" }}>
                {contact.legal_type}
              </Text>
            </Stack>
            <Stack spacing={0}>
              <DetailLabel
                label={`${subModule} Tax ID`}
              />
              <Text fontWeight={'bold'} fontSize={{ base: 'sm', md: "md" }}>
                {contact.tax_id}
              </Text>
            </Stack>
          </Flex>
        </Flex>
      </Stack>
    </ModuleContactFormLayout>
  )
}
