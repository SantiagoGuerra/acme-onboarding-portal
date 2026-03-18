import { z } from "zod";

/**
 * Email validation schema.
 *
 * Uses zod's built-in .email() validator to reject malformed domains
 * like "user@", "foo@bar", and "test@.com".
 */

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(254, "Email must be less than 254 characters");

export function validateEmail(email: string): {
  valid: boolean;
  error?: string;
} {
  const result = emailSchema.safeParse(email);
  if (result.success) {
    return { valid: true };
  }
  return {
    valid: false,
    error: result.error.issues[0]?.message || "Invalid email",
  };
}

export function isEmailAvailable(email: string): boolean {
  // This will be checked against the store in the API route
  return true;
}
