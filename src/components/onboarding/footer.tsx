import { Flex } from "@chakra-ui/react";
import { ButtonSteps } from "./button";
import OnboardingSubmit from "./submit";
import { useFormikContext } from "formik";
import { Onboarding } from "@/libs/yup/onboarding";
import { useFormStatus } from "react-dom";

interface OnboardingFooterProps {
  activeStep: number;
  goToNext: () => void;
  goToPrevious: () => void;
  isActiveStep: (index: number) => boolean;
  length: number;
}

export default function OnboardingFooter({
  activeStep,
  goToNext,
  goToPrevious,
  isActiveStep,
  length,
}: OnboardingFooterProps) {
  const { pending } = useFormStatus();
  const { values } = useFormikContext<Onboarding>();

  const isNextDisabled =
    activeStep === length - 1 ||
    (activeStep === 1 && values.organization.legal_name === "") ||
    pending

  return (
    <Flex
      gap={3}
      justify="end"
      align="center"
      direction={{ base: "column", md: "row" }}
    >
      <ButtonSteps
        onClick={goToPrevious}
        isDisabled={activeStep === 0 || pending}
      >
        Previous
      </ButtonSteps>

      {isActiveStep(length - 1)
        ? <OnboardingSubmit />
        : (
          <ButtonSteps
            onClick={goToNext}
            isDisabled={isNextDisabled}
          >
            Next
          </ButtonSteps>
        )}
    </Flex>
  )
}
