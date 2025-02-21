import { Onboarding } from "@/libs/yup/onboarding"
import { Flex, Icon, Stack, Text } from "@chakra-ui/react"
import { useFormikContext } from "formik"
import { RiGovernmentFill, RiUserFill } from "react-icons/ri";

interface Plan {
  id: number;
  name: "Company" | "Individual";
  icon: React.ElementType;
}

const plans: Plan[] = [
  { id: 1, name: "Company", icon: RiGovernmentFill },
  { id: 2, name: "Individual", icon: RiUserFill },
];

export default function OnboardingSummary() {
  const { values } = useFormikContext<Onboarding>()
  return (
    <Flex
      direction={'column'}
      flex={1}
      py={12}
      gap={6}
    >
      <Text fontSize={'lg'} fontWeight={'bold'}>
        Summary
      </Text>
      <Flex gap={8} direction={{ base: "column", md: "row" }}>
        <Flex
          px={10} py={7}
          rounded={'md'}
          align="center"
          direction={'column'}
          justify="space-between"
          cursor="pointer"
          color={"white"}
          bg={"blue.500"}
          w={'fit-content'}
          h={'fit-content'}
        >
          <Flex align="center" direction={'column'} gap={3}>
            <Icon as={plans.find((p) => p.name === values.plan)?.icon} boxSize={8} />
            <Text fontSize="sm">
              {plans.find((p) => p.name === values.plan)?.name}
            </Text>
          </Flex>
        </Flex>

        <Flex direction={'column'} gap={5}>
          <Stack spacing={1}>
            <Text fontSize={'sm'}>Legal Name</Text>
            <Text fontSize={'md'} fontWeight={'bold'}>{values.organization.legal_name}</Text>
          </Stack>
          <Stack spacing={1}>
            <Text fontSize={'sm'}>Legal Type</Text>
            <Text fontSize={'md'} fontWeight={'bold'}>{values.organization.legal_type}</Text>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  )
}