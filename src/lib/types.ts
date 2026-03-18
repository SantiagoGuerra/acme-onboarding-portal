export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  company?: string;
  role?: string;
  createdAt: Date;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  data?: { userId: string };
  error?: string;
}

export interface ValidateEmailRequest {
  email: string;
}

export interface ValidateEmailResponse {
  success: boolean;
  available: boolean;
  error?: string;
}

export type UserRole =
  | "engineer"
  | "designer"
  | "product-manager"
  | "data-scientist"
  | "devops"
  | "other";

export const VALID_ROLES: UserRole[] = [
  "engineer",
  "designer",
  "product-manager",
  "data-scientist",
  "devops",
  "other",
];
