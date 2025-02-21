import { useFormStatus } from "react-dom";
import { ButtonSteps } from "./button";

export default function OnboardingSubmit() {
  const { pending } = useFormStatus();
  return (
    <ButtonSteps
      type="submit"
      colorScheme="blue"
      loadingText="loading..."
      isLoading={pending}
    >
      Submit
    </ButtonSteps>
  )
}