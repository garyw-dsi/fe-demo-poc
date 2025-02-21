import { Flex } from "@chakra-ui/react";
import OnboardingPlan from "@/components/onboarding/contents/plan";
import OnboardingOrganization from "@/components/onboarding/contents/organization";
import OnboardingSummary from "./summary";

interface OnboardingStepsContentProps {
  activeStep: number;
}

const RenderContents = ({ activeStep }: { activeStep: number }) => {
  switch (activeStep) {
    case 0:
      return <OnboardingPlan />
    case 1:
      return <OnboardingOrganization />
    case 2:
      return <OnboardingSummary />
    default:
      return null
  }
}

export default function OnboardingStepsContent({
  activeStep
}: OnboardingStepsContentProps) {
  return (
    <Flex flex={1}>
      <RenderContents activeStep={activeStep} />
    </Flex>
  )
}
