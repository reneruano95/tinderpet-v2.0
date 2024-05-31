import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isEmpty(obj: { [key: string]: any }) {
  for (let i in obj) {
    return false;
  }
  return true;
}

export function calculateAge(dateOfBirth: string) {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();
  if (
    ageMonths < 0 ||
    (ageMonths === 0 && today.getDate() < birthDate.getDate())
  ) {
    ageYears--;
    ageMonths += 12;
  } else {
    if (ageDays < 0) {
      ageMonths--;
      const daysInMonth = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0
      ).getDate();
      ageDays += daysInMonth;
    }
  }
  return { years: ageYears, months: ageMonths, days: ageDays };
}
