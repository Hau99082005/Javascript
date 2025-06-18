import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Order from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await connectDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser) {
          const {searchParams} = new URL(req.url);
          const id = searchParams.get('id');

          const extractAllOrders = await Order.find({user: id}).populate('orderItems.product')

          if(extractAllOrders) {
            return NextResponse.json({
                success: true,
                data: extractAllOrders
            })
          }else {
            return NextResponse.json({
                success: false,
                message: "Không nhận được tất cả các đơn hàng! Vui lòng thử lại",
            });
          }
        }else {
            return NextResponse.json({
                success: false,
                message: "Bạn chưa được xác thực!",
            });
        }

    }catch(e) {
        console.log(e);
        NextResponse.json({
            success: false,
            message: "Đã xảy ra lỗi! vui lòng thử lại sau",
        });
    }
}