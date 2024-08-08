import { env } from "@/env";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get image URL from file name
 * @param fileName file name
 * @returns {string} image URL
 */
export function getImageUrl(fileName: string) {
  return `${env.NEXT_PUBLIC_UT_URL}/f/${fileName}`;
}

/**
 * Convert cents to dollar amount
 * @param cents number in cents
 * @returns {string} formatted dollar amount
 */
export function formatToDollar(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}
