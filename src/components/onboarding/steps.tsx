"use client"

import { Box, Step, StepDescription, StepIcon, StepIndicator, StepNumber, Stepper, StepSeparator, StepStatus, StepTitle } from "@chakra-ui/react";

export default function OnboardingStep({
  currentStep, steps
}: {
  currentStep: number;
  steps: { title: string; description: string }[];
}) {
  return (
    <Stepper index={currentStep} size={{ base: 'sm', md: 'sm' }}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>
          <Box flexShrink='0' display={{ base: 'none', md: 'block' }}>
            <StepTitle>
              {step.title}
            </StepTitle>
            <StepDescription>
              {step.description}
            </StepDescription>
          </Box>
          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}