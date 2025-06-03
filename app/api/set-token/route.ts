import { setToken } from "@/lib/server/auth-cookie"; // ✅
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token, refreshToken } = await req.json();
  await setToken({ token, refreshToken });
  return NextResponse.json({ success: true });
}
