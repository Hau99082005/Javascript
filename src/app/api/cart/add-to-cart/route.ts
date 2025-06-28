import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Cart from "@/models/cart";
import Product from "@/models/products";
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

       
        const actualUserID = isAuthUser.userID || isAuthUser._id || userID;

        const { error } = AddToCart.validate({ userID: actualUserID, productID, quantity });
        if (error) {
            return NextResponse.json({
                success: false,
                message: error.details[0].message
            }, { status: 400 });
        }

        const product = await Product.findById(productID);
        if (!product) {
            return NextResponse.json({
                success: false,
                message: "Sản phẩm không tồn tại!"
            }, { status: 404 });
        }

        const existingCartItem = await Cart.findOne({
            productID: productID,
            userID: actualUserID
        });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            
            return NextResponse.json({
                success: true,
                message: "Cập nhật số lượng sản phẩm trong giỏ hàng thành công!",
                cartCount: await Cart.countDocuments({ userID: actualUserID })
            });
        }

        const saveProductCart = await Cart.create({
            userID: actualUserID,
            productID,
            quantity
        });

        if (saveProductCart) {
            return NextResponse.json({
                success: true,
                message: "Sản phẩm đã thêm vào giỏ hàng!",
                cartCount: await Cart.countDocuments({ userID: actualUserID })
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