import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Address from "@/models/address";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
    await connectDB();

    const {searchParams} = new URL(req.url);
    const id = searchParams.get('id');
    if(!id) {
        return NextResponse.json({
            success: false,
            message: "Vui lòng đăng nhập!",
        });
    }
    const isAuthUser = await AuthUser(req);
    if(isAuthUser) {
        const getAllAddress = await Address.find({userID : id});
        if(getAllAddress) {
            return NextResponse.json({
                success: true,
                data: getAllAddress
            });
        }else {
            return NextResponse.json({
                success: false,
                message: "Lấy địa chỉ thất bại! vui lòng thử lại",
            });
        }
    }
    }catch(e) {
        console.log(e);
        return NextResponse.json({
            success: false,
            message: "Đã xảy ra lỗi! vui lòng thử lại",
        });
    }
}