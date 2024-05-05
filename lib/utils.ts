import { useState } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toggleShowPassword() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const showPasswordHandler = (event?: React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault();
    setShowPassword(!showPassword);
  };

  return { showPassword, showPasswordHandler };
}

export function toggleShowConfirmPassword() {
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const showConfirmPasswordHandler = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return { showConfirmPassword, showConfirmPasswordHandler };
}
