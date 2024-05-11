import { FormFrame } from "@/components/auth/onboarding/form-frame";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <FormFrame>
        <div className="w-full md:w-[65%] bg-white rounded-lg border border-neutral-700 p-5"></div>
      </FormFrame>
    </div>
  );
}
