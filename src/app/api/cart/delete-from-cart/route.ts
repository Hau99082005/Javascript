import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
        await connectDB();
        const isAuthUser = await AuthUser(req);
        if(isAuthUser) {
          const {searchParams} = new URL(req.url);
          const id = searchParams.get('_id');
          if(!id) {
            return NextResponse.json({
                success: false,
                message: "Cart Item ID is required",
            });
          }
          const deleteCartItem = await Cart.findByIdAndDelete(id);
          if(deleteCartItem) {
             return NextResponse.json({
              success: true,
              message: "Xoá sản phẩm thành công!",
             });
          } else {
             return NextResponse.json({
              success: false,
              message: "Xoá sản phẩm thất bại! vui lòng thử lại!",
             });
          }
        }else {
            return NextResponse.json({
                success: false,
                message: "bạn chưa được xác thực!",
            });
        }

    }catch(error) {
        return NextResponse.json({
            success: false,
            message: "Đã xảy ra lỗi, vui lòng thử lại!"
        })
    }
}