"use client";

import { components } from "@/libs/api/schema/core-services";
import ModuleContactFormLayout from "@/components/modules/core/contacts/layout";
import { Tab, TabList, TabPanel, TabPanels, Tabs, Text, Stack, Divider, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { viewFormattedStdPhone } from "@/utils/formatted-std-phone";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiContactsBook2Fill } from "react-icons/ri";

type subModule = "Contact" | "Customer" | "Vendor";

interface Props {
  subModule?: subModule;
  addresses: components["schemas"]["Address"][] | undefined;
}

interface Title {
  subModule: subModule;
  title: string;
}

const titles: Title[] = [
  { subModule: "Contact", title: "Contact Address" },
  { subModule: "Customer", title: "Customer Address" },
  { subModule: "Vendor", title: "Vendor Address" },
];

interface ViewDataProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const ViewData = ({ icon, label, value }: ViewDataProps) => {
  return (
    <Flex gap={4} align={"center"}>
      <Icon as={icon} boxSize={{ md: 5 }} />
      <Stack spacing={0}>
        <Text fontSize={"xs"} color={useColorModeValue("gray.500", "gray.300")}>
          {label}
        </Text>
        <Text fontWeight={"bold"} fontSize={{ base: 'sm', md: "md" }}>
          {value}
        </Text>
      </Stack>
    </Flex>
  )
}

const NoDataProvided = () => {
  return (
    <Text
      fontSize={"sm"}
      textAlign={"center"}
      color={useColorModeValue("gray.500", "gray.400")}
    >
      No Address Provided
    </Text>
  )
}

const TabHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tab
      px={{ base: 3, lg: 10 }}
      fontSize={{ base: 'xs', lg: 'sm' }}
      whiteSpace={'nowrap'}
      color={useColorModeValue('gray.600', 'gray.400')}
      _selected={{
        bg: useColorModeValue('white', 'gray.800'),
        border: '1px',
        borderColor: useColorModeValue('gray.200', 'gray.700'),
        color: useColorModeValue('blue.400', 'blue.200'),
        fontWeight: 'semibold'
      }}
    >
      {children}
    </Tab>
  )
}

/**
 *
 * @param subModule
 * @param addresses
 *
 * @description
 * This component is used to display the contact address detail.
 * It will display the contact address detail based on the subModule.
 *
 * @example
 * <ModuleContactAddressDetail subModule="Contact" addresses={addresses} /> // subModule contact
 * <ModuleContactAddressDetail subModule="Customer" addresses={addresses} /> // subModule customer
 * <ModuleContactAddressDetail subModule="Vendor" addresses={addresses} /> // subModule vendor
 */
export default function ModuleContactAddressDetail({
  subModule = "Contact",
  addresses,
}: Props) {
  console.log(addresses)
  return (
    <ModuleContactFormLayout
      title={titles.find((t) => t.subModule === subModule)?.title || ""}
    >
      {(addresses && addresses.length > 0)
        ? (
          <Tabs
            isFitted={addresses.length > 1}
            variant="enclosed"
            defaultIndex={0}
          >
            <TabList>
              {addresses.map((address, index) => (
                <TabHeader key={index}>
                  {address.address_type}
                </TabHeader>
              ))}
            </TabList>
            <TabPanels>
              {addresses.map((address, index) => (
                <TabPanel key={index}
                  px={{ base: 0, md: 5 }}
                >
                  <Stack divider={<Divider />}>
                    <ViewData
                      icon={FaLocationDot}
                      label="Address"
                      value={address.address}
                    />
                    <ViewData
                      icon={RiContactsBook2Fill}
                      label="Name"
                      value={address.name || "-"}
                    />
                    <ViewData
                      icon={MdEmail}
                      label="Email"
                      value={address.email || "-"}
                    />
                    <ViewData
                      icon={FaPhoneAlt}
                      label="Phone"
                      value={viewFormattedStdPhone(address.phone || "")}
                    />
                  </Stack>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        )
        : <NoDataProvided />
      }
    </ModuleContactFormLayout>
  )
}
