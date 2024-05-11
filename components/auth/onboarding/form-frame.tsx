"use client";
import { Stepper } from "./stepper";

export function FormFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-between h-[500px] w-11/12 max-w-4xl m-1 relative rounded-lg border border-neutral-700  p-4">
      <Stepper
        steps={["Days", "Shifts", "Hours", "Roles"]}
        currentStep={3}
        goTo={() => {}}
      />
      {children}
    </div>
  );
}
