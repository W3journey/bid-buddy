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
 * Format price
 * @param price price in cents
 * @returns {string} formatted price
 */
export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
}
