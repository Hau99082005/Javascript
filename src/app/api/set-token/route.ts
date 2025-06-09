import { setToken } from "@/lib/server/auth-cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, refreshToken } = await req.json();

    if (!token || !refreshToken) {
      return NextResponse.json(
        { success: false, message: "Missing token or refreshToken" },
        { status: 400 }
      );
    }

    await setToken({ token, refreshToken });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/set-token:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
