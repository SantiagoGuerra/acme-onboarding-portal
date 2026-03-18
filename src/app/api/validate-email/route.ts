import { NextRequest, NextResponse } from "next/server";
import { validateEmail } from "@/lib/validators/email";
import { findUserByEmail } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { success: false, available: false, error: "Email is required" },
        { status: 400 }
      );
    }

    // Validate format
    const validation = validateEmail(email);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, available: false, error: validation.error },
        { status: 400 }
      );
    }

    // Check availability
    const existingUser = findUserByEmail(email);
    const available = !existingUser;

    return NextResponse.json({
      success: true,
      available,
      error: available ? undefined : "Email already registered",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, available: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
