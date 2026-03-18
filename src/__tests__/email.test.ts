import { validateEmail } from "../lib/validators/email";

describe("validateEmail", () => {
  // ✅ These pass correctly
  it("should accept a valid email", () => {
    expect(validateEmail("user@example.com")).toEqual({ valid: true });
  });

  it("should accept emails with subdomains", () => {
    expect(validateEmail("user@mail.example.com")).toEqual({ valid: true });
  });

  it("should reject empty string", () => {
    const result = validateEmail("");
    expect(result.valid).toBe(false);
  });

  it("should reject email without @ symbol", () => {
    const result = validateEmail("userexample.com");
    expect(result.valid).toBe(false);
  });

  // ❌ BUG: These tests FAIL because the regex is too permissive
  it("should reject email without domain extension", () => {
    // BUG: "user@domain" passes the current regex but is invalid
    const result = validateEmail("user@domain");
    expect(result.valid).toBe(false);
  });

  it("should reject email with dot-only domain", () => {
    // BUG: "user@.com" passes the current regex but is invalid
    const result = validateEmail("user@.com");
    expect(result.valid).toBe(false);
  });

  it("should reject email without anything after @", () => {
    // BUG: "user@" passes the current regex (it matches [^\s@]*)
    const result = validateEmail("user@");
    expect(result.valid).toBe(false);
  });
});
