import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Cart from "@/models/cart";
import { NextResponse } from "next/server";
import { URL } from "url";
import mongoose from "mongoose";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        await connectDB();
        const isAuthUser = await AuthUser(req);
        if(isAuthUser) {
            const {searchParams} = new URL(req.url);
            const id = searchParams.get('_id');
            console.log('userID from query:', id);
            if(!id) return NextResponse.json({
                success: false,
                message: "Vui lòng đăng nhập!",
            });
            let objectId;
            try {
                objectId = new mongoose.Types.ObjectId(id);
            } catch (err) {
                console.log('Invalid userID:', id);
                return NextResponse.json({
                    success: false,
                    message: "userID không hợp lệ!",
                });
            }
            const extracAllCartItems = await Cart.find({userID: objectId}).populate('userID').populate('ProductID');
            console.log('Cart items found:', extracAllCartItems);
            if(extracAllCartItems && extracAllCartItems.length > 0) {
                extracAllCartItems.forEach(item => {
                    console.log("Cart Item:");
                    console.log("User ID:", item.userID?._id || "N/A");
                    console.log("Product ID:", item.ProductID?._id || "N/A");
                });
                return NextResponse.json({
                    success: true,
                    data: extracAllCartItems,
                });
            }else {
                return NextResponse.json({
                    success: false,
                    message: "Không tìm thấy mục nào trong Giỏ hàng!",
                    status: 204,
                });
            }
        } else {
            return NextResponse.json({
                success: false,
                message: "Bạn chưa được xác thực",
            });
        }
    } catch(e) {
        console.error("Lỗi lấy giỏ hàng:", e);
        return NextResponse.json({
            success: false,
            message: "Có lỗi xảy ra! vui lòng thử lại",
        });
    }
}