import connectDB from "@/lib/mongodb";
import AuthUser from "@/middleware/Auth";
import Cart from "@/models/cart";
import Joi from "joi";
import { NextResponse } from "next/server";


const AddToCart = Joi.object({
    userID: Joi.string().required(),
    productID: Joi.string().required()
})

export const dynamic = "force-dynamic";


export async function POST(req) {
    try {
        await connectDB();
        const isAuthUser = await AuthUser(req);

        if(isAuthUser) {
            const data = await req.json();
            const {productID, userID} = data;

            const {error} = AddToCart.validate({userID, productID});

            if(error) {
                 return NextResponse.json({
                success: false,
                message: error.details[0].message
            });
            }

            const isCurrentCartItemAlreadyExists = await Cart.find({
                productID: productID,
                userID: userID
            })

            if(isCurrentCartItemAlreadyExists.length > 0) {
                return NextResponse.json({
                    success: false,
                    message: 'Sản phẩm đã được thêm vào giỏ hàng! Vui lòng thêm sản phẩm khác'
                });
            }

            const saveProductToCart = await Cart.create(data);

            if(saveProductToCart) {
                return NextResponse.json({
                    success: true,
                    message: "Sản phẩm Đã Thêm vào Giỏ hàng!",
                });
            } else {
                return NextResponse.json({
                    success: false,
                    message: "Thêm vào giỏ hàng thất bại! vui lòng thử lại",
                });
            }

        }else {
            return NextResponse.json({
                success: false,
                message: "Bạn chưa được xác thực",
            })
        }

    }catch(e) {
        console.error("Lỗi lấy giỏ hàng:", e);
        return NextResponse.json({
            success: false,
            message: "Có lỗi xảy ra! vui lòng thử lại",
        });
    }
}