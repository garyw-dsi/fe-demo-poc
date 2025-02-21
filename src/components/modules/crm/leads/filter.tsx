"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button, Flex, Icon, IconButton, Menu, MenuButton, MenuGroup, MenuList, Radio, RadioGroup, Stack, useColorModeValue } from "@chakra-ui/react";
import { VscSettings } from "react-icons/vsc";

import { leadSource, leadStatus, leadIndustry } from "@/constants/modules/crm";
import TagFilter from "@/components/modules/core/tags/filter-select";

const PARAMETER_FILTERS = {
  LEAD_SOURCE: "lead_source",
  LEAD_STATUS: "lead_status",
  LEAD_INDUSTRY: "lead_industry",
  TAG: "tag_id",
} as const;

type ParameterFilter = typeof PARAMETER_FILTERS[keyof typeof PARAMETER_FILTERS];

export default function ModuleCRMLeadsFilter() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const leadSourceValue = params.get(PARAMETER_FILTERS.LEAD_SOURCE);
  const leadStatusValue = params.get(PARAMETER_FILTERS.LEAD_STATUS);
  const leadIndustryValue = params.get(PARAMETER_FILTERS.LEAD_INDUSTRY);
  const tagValue = params.get(PARAMETER_FILTERS.TAG);

  const borderColor = useColorModeValue("gray.200", "gray.700");
  const bgColor = useColorModeValue("white", "gray.800");

  const updateFilter = (
    key: ParameterFilter,
    value?: string
  ) => {
    const newParams = new URLSearchParams(params);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const clearFilters = () => {
    const newParams = new URLSearchParams(params);
    Object.values(PARAMETER_FILTERS)
      .forEach(param => newParams.delete(param));

    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Menu 
      closeOnSelect={false} 
      isLazy
    >
      <MenuButton
        as={IconButton}
        size="md"
        icon={<Icon as={VscSettings} boxSize={4} />}
        bg={useColorModeValue("white", "gray.700")}
        border="1px"
        borderColor={borderColor}
      />
      <MenuList 
        zIndex={999} 
        bg={bgColor}
      >
        <Flex 
          gap={5} 
          pb={4}
        >
          <Stack>
            <Flex 
              gap={5} 
              pb={4}
              borderBottom = "1px"
              borderColor = {borderColor}
            >
              <MenuGroup title="Filter Lead Source">
                <RadioGroup
                  onChange={value => updateFilter(PARAMETER_FILTERS.LEAD_SOURCE, value)}
                  value={leadSourceValue || ""}
                  pb={4}
                >
                  <Stack px={5} spacing={2}>
                    {leadSource.map((source, index) => (
                      <Radio key={index} value={source} size="sm">
                        {source}
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </MenuGroup>
              
              <Stack
                borderLeft = "1px"
                borderColor = {borderColor}
              >
                <MenuGroup title="Filter Lead Status">
                  <RadioGroup
                    onChange={value => updateFilter(PARAMETER_FILTERS.LEAD_STATUS, value)}
                    value={leadStatusValue || ""}
                    pb={4}
                  >
                    <Stack 
                      px={5} 
                      spacing={2}
                    >
                      {leadStatus.map((status, index) => (
                        <Radio key={index} value={status} size="sm">
                          {status}
                        </Radio>
                      ))}
                    </Stack>
                  </RadioGroup>
                </MenuGroup>
              </Stack>
            </Flex>
            <MenuGroup title="Filter Tag">
              <Stack px={5} pb={4}>
                <TagFilter
                  placeholder="Select tag to filter"
                  onChange={(value) => updateFilter(PARAMETER_FILTERS.TAG, value)}
                  defaultValue={tagValue ? { value: tagValue, label: "" } : undefined}
                />
              </Stack>
            </MenuGroup>
          </Stack>

          <Stack
            borderLeft = "1px"
            borderColor = {borderColor}
          >
            <MenuGroup title="Filter Industry">
              <RadioGroup
                onChange={value => updateFilter(PARAMETER_FILTERS.LEAD_INDUSTRY, value)}
                value={leadIndustryValue || ""}
                pb={4}
              >
                <Stack 
                  px={5} 
                  spacing={2}
                >
                  {leadIndustry.map((industry, index) => (
                    <Radio key={index} value={industry} size="sm">
                      {industry}
                    </Radio>
                  ))}
                </Stack>
              </RadioGroup>
            </MenuGroup>
          </Stack>
        </Flex>
        
        {(leadSourceValue || leadStatusValue || leadIndustryValue || tagValue) && (
          <Flex justify="end" px={3} pb={2}>
            <Button
              size="sm"
              fontSize="xs"
              variant="link"
              colorScheme="red"
              onClick={clearFilters}
            >
              Clear Filter
            </Button>
          </Flex>
        )}
      </MenuList>
    </Menu>
  )
}
