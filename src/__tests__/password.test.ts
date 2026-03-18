import { validatePassword } from "../lib/validators/password";

describe("validatePassword", () => {
  it("should accept a valid password", () => {
    expect(validatePassword("SecurePass1")).toEqual({ valid: true });
  });

  it("should reject passwords shorter than 8 characters", () => {
    const result = validatePassword("Abc1");
    expect(result.valid).toBe(false);
  });

  it("should reject passwords without uppercase", () => {
    const result = validatePassword("password1");
    expect(result.valid).toBe(false);
  });

  it("should reject passwords without numbers", () => {
    const result = validatePassword("SecurePass");
    expect(result.valid).toBe(false);
  });

  it("should accept passwords at exactly 8 characters", () => {
    expect(validatePassword("Abcdef1x")).toEqual({ valid: true });
  });
});
