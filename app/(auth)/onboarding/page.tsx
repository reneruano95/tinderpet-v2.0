import { Stepper } from "@/components/auth/onboarding/stepper";

export default function OnboardingPage() {
  return <Stepper
  steps={["Days", "Shifts", "Hours", "Roles"]}
  currentStep={2}
/>;
}
