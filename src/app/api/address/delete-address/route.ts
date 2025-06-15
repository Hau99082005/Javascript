import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Address from "@/models/address";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function DELETE(req) {
    try {
     await connectDB();
     const {searchParams} = new URL(req.url);
     const id = searchParams.get('id');
     if(!id) {
        return NextResponse.json({
            success: false,
            message: "Địa chỉ không hợp lệ",
        })
     }
     const isAuthUser = await AuthUser(req);
     if(isAuthUser) {
        const deleteAddress = await Address.findByIdAndDelete(id);
        if(deleteAddress) {
            return NextResponse.json({
                success: true,
                message: "Đã xoá địa chỉ thành công!",
            });
        }else {
            return NextResponse.json({
                success: false,
                message: "Đã xoá địa chỉ thất bại! vui lòng thử lại",
            });
        }
     }else {
        return NextResponse.json({
            success: false,
            message: "Bạn chưa được xác thực",
        });
     }
    }catch(e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Đã xảy ra lỗi! vui lòng thử lại",
        });
    }
}