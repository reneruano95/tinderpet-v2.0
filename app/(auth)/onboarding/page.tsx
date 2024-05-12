import { FormFrame } from "@/components/auth/onboarding/form-frame";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <FormFrame>
        <div className="w-full h-[90%]"></div>
      </FormFrame>
    </div>
  );
}
