import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Address from "@/models/address";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function PUT(req) {
    try {
     await connectDB();
     const isAuthUser = await AuthUser(req);
     if(isAuthUser) {
        const data = await req.json();
        const {_id, name, city, address, country, postalCode} = data;

        const updateAddress = await Address.findOneAndUpdate({
            _id: _id,
        }, {name, city, address, country, postalCode},{new: true})
        if(updateAddress) {
            return NextResponse.json({
                success: true,
                message: "Địa chỉ đã được cập nhật thành công!",
            });
        }else {
            return NextResponse.json({
                success: false,
                message: "Cập nhật địa chỉ thất bại! vui lòng thử lại",
            });
        }
     }else {
        return NextResponse.json({
            success: false,
            message: "Bạn chưa xác thực!",
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