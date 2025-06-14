import { NextResponse } from "next/server";
import { updateCartItemQuantity } from "@/services/cart/updateCartItemQuantity";

export async function PUT(request: Request) {
  try {
    const { cartItemId, quantity } = await request.json();

    if (!cartItemId || typeof quantity !== "number" || quantity < 1) {
      return NextResponse.json(
        { success: false, message: "Dữ liệu yêu cầu không hợp lệ" },
        { status: 400 }
      );
    }

    await updateCartItemQuantity(cartItemId, quantity);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lỗi khi cập nhật số lượng:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi server" },
      { status: 500 }
    );
  }
}
