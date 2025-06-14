import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddToCart = Joi.object({
    userID: Joi.string().required(),
    productID: Joi.string().required(),
    quantity: Joi.number().min(1).required()
});

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        await connectDB();
        const isAuthUser = await AuthUser(req);
        
        if (!isAuthUser) {
            return NextResponse.json({
                success: false,
                message: "Bạn chưa được xác thực!"
            }, { status: 401 });
        }

        const data = await req.json();
        const { productID, userID, quantity } = data;

        const { error } = AddToCart.validate({ userID, productID, quantity });
        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            }, { status: 400 });
        }

        // Check if item already exists in cart
        const existingCartItem = await Cart.findOne({
            productID: productID,
            userID: userID
        });

        if (existingCartItem) {
            // Update quantity if item exists
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            
            return NextResponse.json({
                success: true,
                message: "Cập nhật số lượng sản phẩm trong giỏ hàng thành công!",
                cartCount: await Cart.countDocuments({ userID })
            });
        }

        // Create new cart item
        const saveProductCart = await Cart.create({
            userID,
            productID,
            quantity
        });

        if (saveProductCart) {
            return NextResponse.json({
                success: true,
                message: "Sản phẩm đã thêm vào giỏ hàng!",
                cartCount: await Cart.countDocuments({ userID })
            });
        }

        return NextResponse.json({
            success: false,
            message: "Thêm sản phẩm vào giỏ hàng thất bại! Vui lòng thử lại"
        }, { status: 500 });

    } catch (error) {
        console.error("Cart error:", error);
        return NextResponse.json({
            success: false,
            message: "Có lỗi xảy ra! Vui lòng thử lại"
        }, { status: 500 });
    }
}