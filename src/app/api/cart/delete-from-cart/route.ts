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
       const{searchParams} = new URL(req.url);
       const id = searchParams.get('id');
       if(!id) 
        return NextResponse.json({
            success: false,
            message: "Cart Item ID is required!",
        });
        const deleteCartItem = await Cart.findByIdAndDelete(id);

        if(deleteCartItem) {
            return NextResponse.json({
                success: true,
                message: "Sản phẩm đã xoá khỏi giỏ hàng thành công!",
            });
        }else {
            return NextResponse.json({
                success: false,
                message: "Đã xoá giỏ hàng thất bại! vui lòng thử lại",
            })
        }
       
     } else {
       NextResponse.json({
        success: false,
        message: "Bạn chưa được xác thực!",
       })
     }
    }catch(error : any) {
        return NextResponse.json({
            success: false,
            message: "Đã xảy ra lỗi! vui lòng đăng nhập lại!",
        });
    }
}