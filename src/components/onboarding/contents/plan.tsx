"use client"

import { Flex, Icon, RadioProps, Text, useColorModeValue, useRadio, useRadioGroup } from "@chakra-ui/react";
import { RiGovernmentFill, RiUserFill } from "react-icons/ri";
import { useFormikContext } from "formik";
import { Onboarding } from "@/libs/yup/onboarding";

interface Plan {
  id: number;
  name: "Company" | "Individual";
  icon: React.ElementType;
}

const plans: Plan[] = [
  { id: 1, name: "Company", icon: RiGovernmentFill },
  { id: 2, name: "Individual", icon: RiUserFill },
];

const RadioOnboardingPlan = ({
  plan,
  ...props
}: {
  plan: Plan
} & RadioProps) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const radio = getRadioProps();

  return (
    <Flex
      as="label"
      border="1px"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      px={10} py={7}
      rounded={'md'}
      align="center"
      direction={'column'}
      justify="space-between"
      cursor="pointer"
      color={useColorModeValue("gray.400", "gray.400")}
      _checked={{
        bg: "blue.500",
        borderColor: "blue.300",
        color: 'white'
      }}
      {...radio}
    >
      <Flex align="center" direction={'column'} gap={3}>
        <Icon as={plan.icon} boxSize={8} />
        <Text fontSize="sm">
          {plan.name}
        </Text>
      </Flex>
      <input {...input} />
    </Flex>
  );
};

export default function OnboardingPlan() {
  const { setFieldValue, values } = useFormikContext<Onboarding>();

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "plan",
    value: values.plan,
    onChange: (value) => {
      console.log(value);
      setFieldValue("plan", value);
    }
  });

  const group = getRootProps();

  return (
    <Flex
      flex={1}
      justify={'center'}
      align={'center'}
      gap={10}
      direction={'column'}
      {...group}
    >
      <Text fontSize={'lg'} fontWeight={'bold'}>
        Choose your plan
      </Text>

      <Flex align={'center'} gap={5}>
        {plans.map((plan) => {
          const radio = getRadioProps({ value: plan.name.toString() });
          return (
            <RadioOnboardingPlan
              key={plan.id}
              plan={plan}
              {...radio}
            />
          );
        })}
      </Flex>
    </Flex>
  )
}
