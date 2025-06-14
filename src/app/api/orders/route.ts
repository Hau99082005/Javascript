import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    await connectDB();
    const isAuthUser = await AuthUser(req);
    if (isAuthUser) {
      const data = await req.json();
      const { userID, items, totalAmount, shippingAddress } = data;
      const order = await Order.create({
        userID,
        items,
        totalAmount,
        shippingAddress,
        status: "pending",
      });
      return NextResponse.json({
        success: true,
        message: "Đặt hàng thành công!",
        data: order,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Bạn chưa được xác thực!",
      });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({
      success: false,
      message: "Có lỗi xảy ra, vui lòng thử lại!",
    });
  }
}
