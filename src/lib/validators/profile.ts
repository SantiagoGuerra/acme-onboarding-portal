import { z } from "zod";
import { VALID_ROLES } from "../types";

export const profileSchema = z.object({
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  role: z.enum(VALID_ROLES as [string, ...string[]], {
    errorMap: () => ({ message: "Please select a valid role" }),
  }),
});

export function validateProfile(data: {
  company: string;
  role: string;
}): { valid: boolean; errors?: Record<string, string> } {
  const result = profileSchema.safeParse(data);
  if (result.success) {
    return { valid: true };
  }
  const errors: Record<string, string> = {};
  for (const issue of result.error.issues) {
    const field = issue.path[0] as string;
    errors[field] = issue.message;
  }
  return { valid: false, errors };
}
