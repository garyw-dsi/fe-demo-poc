"use client"

import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react";

const Header = ({ children }: { children: React.ReactNode }) => {
  return (
    <Tab
      px={{ base: 3, lg: 10 }}
      py={{ base: 4, lg: 2 }}
      fontSize={{ base: 'xs', lg: 'sm' }}
      whiteSpace={'nowrap'}
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

const Panel = ({ children }: { children: React.ReactNode }) => {
  return (
    <TabPanel p={0}>
      {children}
    </TabPanel>
  )
}

interface ModulePurchaseRequisitionDetailTabs {
  purchsaeRequisition: React.ReactNode;
  otherInfo: React.ReactNode;
}

const tabHeader = [
  "Requisition Detail",
  "Other Info"
] as const;

export default function ModulePurchaseRequisitionDetailTabs({
  purchsaeRequisition,
  otherInfo
}: ModulePurchaseRequisitionDetailTabs) {
  return (
    <Tabs variant={'enclosed'} w={'full'} size={'sm'}>
      <TabList overflowX={'auto'} overflowY={'hidden'}>
        {tabHeader.map((header, index) => (
          <Header key={index}>{header}</Header>
        ))}
      </TabList>
      <TabPanels pt={2}>
        <Panel>{purchsaeRequisition}</Panel>
        <Panel>{otherInfo}</Panel>
      </TabPanels>
    </Tabs>
  )
}