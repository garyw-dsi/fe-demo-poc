"use client";

import { Button, Flex, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuList, Radio, RadioGroup, Stack, useColorModeValue } from "@chakra-ui/react";
import { VscSettings } from "react-icons/vsc";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { employeeOrganization, employeeDepartment } from "@/constants/modules/hr/employee";

const PARAMETER_FILTERS = {
  organization: "organization",
  department: "department",
};

export default function ModuleHREmployeeFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialOrganization = params.get(PARAMETER_FILTERS.organization);
  const initialDepartment = params.get(PARAMETER_FILTERS.department);

  const [organization, setOrganization] = useState<string | null>(initialOrganization);
  const [department, setDepartment] = useState<string | null>(initialDepartment);

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");

  const updateQueryParams = (key: string, value: string | null): void => {
    const newParams = new URLSearchParams(params);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    const url = `${pathname}?${newParams.toString()}`;
    router.push(url);
  };

  const handleOrganizationChange = (value: string): void => {
    setOrganization(value);
    updateQueryParams(PARAMETER_FILTERS.organization, value);
  };

  const handleDepartmentChange = (value: string): void => {
    setDepartment(value);
    updateQueryParams(PARAMETER_FILTERS.department, value);
  };

  const clearFilters = (): void => {
    setOrganization(null);
    setDepartment(null);

    const newParams = new URLSearchParams(params);
    newParams.delete(PARAMETER_FILTERS.organization);
    newParams.delete(PARAMETER_FILTERS.department);

    const url = `${pathname}?${newParams.toString()}`;
    router.push(url);
  };

  return (
    <Menu closeOnSelect={false} isLazy>
      <MenuButton
        as={IconButton}
        size="md"
        icon={<Icon as={VscSettings} boxSize={4} />}
        bg={useColorModeValue("white", "gray.700")}
        border="1px"
        borderColor={borderColor}
      />
      <MenuList zIndex={999} bg={bgColor}>
        <Flex gap={5} pb={4}>
          <MenuGroup title="Organization">
            <RadioGroup
              value={organization || ""}
              onChange={handleOrganizationChange}
            >
              <Stack px={5} spacing={2}>
                {employeeOrganization.map((organization, index) => (
                  <Radio key={index} value={organization} size="sm">
                    {organization}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          </MenuGroup>

          <Stack
            borderLeft="1px"
            borderColor={borderColor}
          >
            <MenuGroup title="Department">
              <RadioGroup
                value={department || ""}
                onChange={handleDepartmentChange}
              >
                <Stack px={5} spacing={2}>
                  {employeeDepartment.map((department, index) => (
                    <Radio key={index} value={department} size="sm">
                      {department}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </MenuGroup>
          </Stack>
        </Flex>

        {(organization || department) && (
          <Flex justify="end" px={3} pb={2}>
            <Button
              size="sm"
              fontSize="xs"
              variant="link"
              colorScheme="red"
              onClick={clearFilters}
            >
              Clear Filters
            </Button>
          </Flex>
        )}
      </MenuList>
    </Menu>
  )
}
