"use client";

import { useFormState } from "react-dom";
import { Alert, AlertIcon, Flex } from "@chakra-ui/react";
import { useSteps } from "@chakra-ui/react";
import { Formik } from "formik";

import { FormState } from "@/libs/api/constants";
import { onboardingSchema } from "@/libs/yup/onboarding";

import { registrationCompany } from "@/app/actions/new-user";

import OnboardingStep from "@/components/onboarding/steps";
import OnboardingStepsContent from "@/components/onboarding/contents";
import OnboardingFooter from "@/components/onboarding/footer";
import SuccessAlert from "../alert/success";
import { useRouter } from "next/navigation";

const steps = [
  { title: "First", description: "Select your Plan" },
  { title: "Second", description: "Fill out the information" },
  { title: "Final", description: "Summary your information" },
];

export default function OnboardingProvider() {
  const router = useRouter();

  const initialOnboardingState: FormState = {
    message: "",
    status: "idle",
  };

  const [onboardingState, onboardingAction] = useFormState(
    registrationCompany,
    initialOnboardingState
  );

  const { activeStep, goToNext, goToPrevious, isActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  return (
    <Formik
      initialValues={{
        plan: "Individual",
        organization: {
          legal_name: "",
          legal_type: "Individual",
        },
      }}
      validationSchema={onboardingSchema}
      onSubmit={(values) => {
        const formData = new FormData();
        formData.append("legal_name", values.organization.legal_name);
        formData.append("legal_type", values.organization.legal_type);

        onboardingAction(formData);
      }}
    >
      {({ handleSubmit }) => (
        <Flex as="form"
          action={() => handleSubmit()}
          direction={"column"}
          gap={6}
          flex={1}
          justify={"space-between"}
          py={{ base: 5, md: 12 }}
        >
          <OnboardingStep currentStep={activeStep} steps={steps} />
          {onboardingState.status === 'error' && (
            <Alert
              status={"error"}
              fontSize={{ base: "sm", md: "xs" }}
              rounded={"md"}
              variant={'solid'}
            >
              <AlertIcon />
              {onboardingState.message}
            </Alert>
          )}

          <SuccessAlert
            title="Success Register Company"
            isOpen={onboardingState.status === 'success'}
            description={onboardingState.message}
            onClose={() => router.push("/modules")}
            closeLabel="Go to Modules"
          />

          <Flex direction={"column"} flex={1} gap={6} justify={"space-between"}>
            <OnboardingStepsContent activeStep={activeStep} />
            <OnboardingFooter
              activeStep={activeStep}
              goToNext={goToNext}
              goToPrevious={goToPrevious}
              isActiveStep={isActiveStep}
              length={steps.length}
            />
          </Flex>
        </Flex>
      )}
    </Formik>
  )
}