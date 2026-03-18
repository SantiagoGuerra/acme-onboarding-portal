import { User } from "./types";

// In-memory store for demo purposes
const users: Map<string, User> = new Map();

// Seed with a couple of existing users
users.set("user-1", {
  id: "user-1",
  name: "Jane Doe",
  email: "jane@acme.com",
  password: "hashed_password_1",
  company: "Acme Corp",
  role: "engineer",
  createdAt: new Date("2024-01-15"),
});

users.set("user-2", {
  id: "user-2",
  name: "John Smith",
  email: "john@acme.com",
  password: "hashed_password_2",
  company: "Acme Corp",
  role: "product-manager",
  createdAt: new Date("2024-02-20"),
});

export function findUserByEmail(email: string): User | undefined {
  for (const user of Array.from(users.values())) {
    if (user.email === email) {
      return user;
    }
  }
  return undefined;
}

export function createUser(data: Omit<User, "id" | "createdAt">): User {
  const id = `user-${Date.now()}`;
  const user: User = {
    ...data,
    id,
    createdAt: new Date(),
  };
  users.set(id, user);
  return user;
}

export function getAllUsers(): User[] {
  return Array.from(users.values());
}
