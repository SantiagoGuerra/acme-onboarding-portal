import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .max(128, "Password must be less than 128 characters");

export function validatePassword(password: string): {
  valid: boolean;
  error?: string;
} {
  const result = passwordSchema.safeParse(password);
  if (result.success) {
    return { valid: true };
  }
  return {
    valid: false,
    error: result.error.issues[0]?.message || "Invalid password",
  };
}
