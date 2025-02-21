"use client"

import { Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from "@chakra-ui/react";
import DetailProfileSettings from "./settings";

const tabHeader = [
  'Settings',
  'User Information',
  'Group Information',
  'Organization Information'
] as const;

interface UserProfileTabsProps {
  user: React.ReactNode;
  group: React.ReactNode;
  organization: React.ReactNode;
}

const Panel = ({ children }: { children: React.ReactNode }) => {
  return (
    <TabPanel
      border={'1px'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      bg={useColorModeValue('white', 'gray.800')}
      rounded={'md'}
    >
      {children}
    </TabPanel>
  )
}

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

export default function UserProfileTabs({
  user,
  group,
  organization
}: Readonly<UserProfileTabsProps>) {
  return (
    <Tabs variant={'enclosed'} w={'full'} size={'sm'}>
      <TabList overflowX={'auto'} overflowY={'hidden'}>
        {tabHeader.map((header, index) => (
          <Header key={index}>{header}</Header>
        ))}
      </TabList>
      <TabPanels pt={2}>
        <Panel>
          <DetailProfileSettings />
        </Panel>
        <Panel>{user}</Panel>
        <Panel>{group}</Panel>
        <Panel>{organization}</Panel>
      </TabPanels>
    </Tabs>
  )
}