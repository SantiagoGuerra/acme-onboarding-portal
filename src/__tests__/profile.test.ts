import { validateProfile } from "../lib/validators/profile";

describe("validateProfile", () => {
  it("should accept valid profile data", () => {
    expect(
      validateProfile({ company: "Acme Corp", role: "engineer" })
    ).toEqual({ valid: true });
  });

  it("should reject company name too short", () => {
    const result = validateProfile({ company: "A", role: "engineer" });
    expect(result.valid).toBe(false);
    expect(result.errors?.company).toBeDefined();
  });

  it("should reject invalid role", () => {
    const result = validateProfile({ company: "Acme Corp", role: "ceo" });
    expect(result.valid).toBe(false);
    expect(result.errors?.role).toBeDefined();
  });

  it("should accept all valid roles", () => {
    const roles = [
      "engineer",
      "designer",
      "product-manager",
      "data-scientist",
      "devops",
      "other",
    ];
    for (const role of roles) {
      expect(validateProfile({ company: "Test Co", role })).toEqual({
        valid: true,
      });
    }
  });
});
