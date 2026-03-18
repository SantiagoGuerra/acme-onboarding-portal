import { z } from "zod";

/**
 * Email validation schema.
 *
 * ⚠️ INTENTIONAL BUG FOR DEMO:
 * This regex is too permissive — it does NOT properly validate email format.
 * It allows strings like "user@", "foo@bar", and "test@.com" to pass.
 * The bug: the regex only checks for an @ symbol, not for a valid domain.
 *
 * A proper implementation would use a stricter regex or zod's built-in .email().
 */

// BUG: This regex only checks for @ sign, not valid email format
const EMAIL_REGEX = /^[^\s@]+@[^\s@]*$/;

export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .regex(EMAIL_REGEX, "Please enter a valid email address")
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
